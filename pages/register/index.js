import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { Form , Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Container } from 'react-bootstrap';

export default function index() {

    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [mobileNo , setMobileNo] = useState("");
    const [email , setEmail] = useState("");
    const [password1 , setPassword1] = useState("");
    const [password2 , setPassword2] = useState("");
    const [isActive , setIsActive] = useState(false);

    function registerUser(e) {

        e.preventDefault();

        fetch("http://localhost:4000/api/users/email-exists", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify( { email } )
        })
        .then( res => res.json() )
        .then( data =>{ 
            if(data === false) {
                fetch("http://localhost:4000/api/users/", {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        mobileNo: mobileNo,
                        email: email,
                        password: password1
                    })
                })
                .then( res => res.json() )
                .then( () => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Sucessful',
                            text: 'All set, Please Login to continue.'
                        })
                        .then( Router.push('/login/'))
                })

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed',
                    text: 'Email already exist, use another email.'
                })
            }
        })

        // Clear input data
        setFirstName('');
        setLastName('');
        setMobileNo('');
        setEmail('');
        setPassword1('');
        setPassword2('');

    }
    
    
        useEffect( () => {
            
            if (( firstName !== '' && lastName !== '' && mobileNo !== '' && email !== '' && password1 !== '' && password2 !== '') &&  (password1 === password2) && (mobileNo.length === 11)) {
                setIsActive(true)
            } else {
                setIsActive(false)
            }
            
            
        }, [ firstName, lastName, mobileNo, email, password1, password2 ] )
    return (
        <Container>
            <Form onSubmit={(e) => registerUser(e)}>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="mobileNo">
                    <Form.Label>Contact No</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="enter contact no"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="userEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Form.Text className="text-muted">
                        We'll never share ypur email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="password1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="enter password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password2">
                    <Form.Label>Verify Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="verify password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </Form.Group>
                { isActive 
                ?<Button variant="primary" type="submit" id="submitBtn">
                    Submit
                </Button>
                : <Button variant="danger" type="submit" id="submitBtn" disabled>
                    Submit
                </Button>  }
                
            </Form>
        </Container>
        
    )
}