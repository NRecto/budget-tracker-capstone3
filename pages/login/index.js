import React, { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import { Form, Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import styles from '../../styles/Login.module.css';


// import users from '../data/users';
import UserContext from '../../UserContext';
import {GoogleLogin} from 'react-google-login';



export default function index() {

    const { user,setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [imgUrl, setImgUrl] =useState('');

    function authenticate(e) {
        e.preventDefault();

        fetch('https://protected-retreat-88721.herokuapp.com/api/users/login', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then( res => res.json() )
        .then( data => {
            if(data.accessToken){

                localStorage.setItem('token', data.accessToken)
                setEmail('')
                setPassword('')

                fetch('https://protected-retreat-88721.herokuapp.com/api/users/details', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${data.accessToken}` 
                    }
                })
                .then( res => res.json() )
                .then( data => {
                    // console.log(data)
                    localStorage.setItem('id', data._id)
                    localStorage.setItem('isAdmin', data.isAdmin)
                    
                    
                    setUser({
                        id: data._id,
                        isAdmin: data.isAdmin
                    })
 
                    Swal.fire({
                        icon: "success",
                        title: "Successfully Logged In",
                        text: "Thank you for logging in!"
                    })
                    
                    Router.push({
                        pathname: 'user/[id]',
                        query: { id: data._id}
                    })

                })
                
            } else {

                if (data.error === 'does-not-exist'){
                    Swal.fire({
                        icon: "error",
                        title: "Authentication Failed",
                        text: "User does not exist!"
                    })
                    Router.push('/register')
                } else if ( data.error === 'incorrect-password') {
                    Swal.fire({
                        icon: "error",
                        title: "Authentication Failed",
                        text: "Password is incorrect!"
                    })
                } else if (data.error === 'login-type-error') {
                    Swal.fire({
                        icon: "error",
                        title: "Authentication Failed",
                        text: "You may have registered through a different method."
                    })
                }
                
            }
        })

    }

    function authenticateGoogleToken(response){ 
        
        fetch('https://protected-retreat-88721.herokuapp.com/api/users/verify-google-id-token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                tokenId: response.tokenId
            })
        })
        .then( res => res.json () )
        .then( data => {
            // console.log(data)
            if (typeof data.accessToken !== 'undefined') {
                localStorage.setItem('token', data.accessToken)
                // console.log('Successfull')
                retrieveUserDetails(data.accessToken)

            } else {
                if ( data.error === 'google-auth-error'){
                   return Swal.fire({
                        title: 'Google Auth Error',
                        text: 'Google authentication procedure failed',
                        icon: 'error'
                    })
                } else if (data.error === 'login-type-error') {
                    return Swal.fire({
                        title: 'Login Type Error',
                        text: 'You may have registered through a different login procedure',
                        icon: 'error'
                    })
                }
            }
        } )

        setImgUrl(localStorage.setItem('imgUrl', response.profileObj.imageUrl))
    }

    function retrieveUserDetails(accessToken) {
        fetch('https://protected-retreat-88721.herokuapp.com/api/users/details', {
            headers: {
                'Authorization' : `Bearer ${accessToken}`
            }
        })
        .then( res => res.json() )
        .then( data => {
            // console.log(data)
            localStorage.setItem('id', data._id)
            localStorage.setItem('isAdmin', data.isAdmin)

            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            })
            Router.push({
                pathname: 'user/[id]',
                query: { id: data._id}
            })
        })
    }

    useEffect(() => {
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    
    return (
        <div className={styles.bodyLogin}>
            <Container >
                <div className={styles.container}>
                <Form onSubmit={(e) => authenticate(e)}>
                    <Form.Group controlId="userEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {isActive ? 
                        <Button variant="primary" type="submit" id="submitBtn" className="btn-block">
                            Submit
                        </Button>
                        : 
                        <Button variant="danger" type="submit" id="submitBtn" disabled className="btn-block">
                        Submit
                    </Button>
                }

                <GoogleLogin 
                    clientId="430272439226-6evoa7j40inti7gc8o80dn1mg59urgd3.apps.googleusercontent.com"
                    buttonText="Login Using Google"
                    onSuccess={authenticateGoogleToken}
                    onFailure={authenticateGoogleToken}
                    cookiePolicy={'single_host_origin'}
                    className="w-100 text-center my-4 d-flex justify-content-center"
                />
            </Form>
            </div>
        </Container>
        </div>
    )
}