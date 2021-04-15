import React, {useEffect, useState} from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Router  from 'next/router';
import styles from '../../styles/Categories.module.css';

export default function newCategory () {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [type, setType] = useState(true);

    useEffect( () => {
        setToken(localStorage['token'])
        
    }, [name, type]);

    function addNewCategory(e){
        e.preventDefault();
        if( type !== true ){
            fetch('http://localhost:4000/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                type
            })
            })
            .then( res => res.json() )
            .then( data => {
                console.log(data.err)
                if(data.err === 'name-already-exist') {
                    Swal.fire(
                        'Error!',
                        'Catergory Name already exist.',
                        'error'
                    )
                } else {
                    Swal.fire(
                        'Success!',
                        'Successfully Added Catergory.',
                        'success'
                    )
                    .then(
                        Router.push('/categories')
                    )
                }
            })
        }
        
    };
    
    return (
        <React.Fragment>
        <div className={styles.mainForm}>
            <Container className={styles.formContainer}>
            <div className={styles.bodyForm}>
            <h1>New Category</h1>
                <Form onSubmit={ (e)=> addNewCategory(e)}>
                    <Form.Group>
                        <Form.Label>Category Name:</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Category Name"
                                value={name}
                                onChange={ (e) => setName(e.target.value)}
                                required
                            />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category Type:</Form.Label>
                        <Form.Control 
                        as="select" 
                        value={type}
                        onChange={ (e) => setType(e.target.value)}
                        >
                            <option value='true' disabled>Select</option>
                            <option>Income</option>
                            <option>Expense</option>
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" variant='primary'>Add</Button>
                </Form>
            </div>
            </Container>
        </div>
        </React.Fragment>
    )
}