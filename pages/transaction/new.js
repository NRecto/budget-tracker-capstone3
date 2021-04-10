import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button } from 'react-bootstrap';
import UserContext from "../../UserContext";
import Swal from 'sweetalert2';
import Router from 'next/router';

export default function newTransaction({data}){

    const { user } = useContext(UserContext);
    const newData = data.filter( categ => categ.user === user.id)
    const incomeType = newData.filter( data => data.type === 'Income')
    const expenseType = newData.filter( data => data.type === 'Expense')
    const optionIncome = incomeType.map( data => {
        let nameCapitalized = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        return (
            <option key={data._id} value={data.name}>
                {nameCapitalized}
            </option>
        )
    })
    const optionExpense = expenseType.map( data => {
        let nameCapitalized = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        return (
            <option key={data._id} value={data.name}>
                {nameCapitalized}
            </option>
        )
    })
    const [token, setToken] = useState('')
    const [type, setType] = useState(true);
    const [name, setName] = useState(true);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');


    useEffect( ()=> {
        setToken(localStorage['token'])
    }, [name, type, amount, description])


    function addNewTransaction(e) {
        e.preventDefault();
        fetch('http://localhost:4000/api/ledger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                type,
                amount,
                description
            })
        })
        .then( res => res.json() )
        .then( data => {
            if(!data) {
                Swal.fire(
                    'Error!',
                    'Adding New Transaction Failed',
                    'error'
                )
            } else {
                Swal.fire(
                    'Success!',
                    'Successfully Added New Transaction.',
                    'success'
                )
                .then(
                    Router.push('/transaction')
                )
            }
        })
    }
    
    return(
        <React.Fragment>
        <Container>
            <h1>Transaction</h1>
            <Form onSubmit={ (e)=> addNewTransaction(e)}>
                <Form.Group>
                    <Form.Label>Category Type:</Form.Label>
                    <Form.Control 
                    as="select" 
                    className="w-75"
                    value={type}
                    onChange={ (e) => setType(e.target.value)}
                    >
                        <option value='true' disabled>Select</option>
                        <option>Income</option>
                        <option>Expense</option>
                    </Form.Control>
                </Form.Group>
                {
                    type === true 
                    ?   <Form.Group>
                            <Form.Label>Category Name:</Form.Label>
                            <Form.Control 
                            as="select" 
                            className="w-75"
                            value={type}
                            onChange={ (e) => setType(e.target.value)}
                            >
                                <option value='true' disabled>Select</option>
                            </Form.Control>
                    </Form.Group>
                    :
                    type === "Income"
                    ? <Form.Group>
                        <Form.Label>Category Name:</Form.Label>
                        <Form.Control 
                        as="select" 
                        className="w-75"
                        value={name}
                        onChange={ (e) => setName(e.target.value)}
                        >
                            <option value='true' disabled>Select</option>
                            {optionIncome}
                        </Form.Control>
                    </Form.Group>
                    : <Form.Group>
                        <Form.Label>Category Name:</Form.Label>
                        <Form.Control 
                        as="select" 
                        className="w-75"
                        value={name}
                        onChange={ (e) => setName(e.target.value)}
                        >
                            <option value='true' disabled>Select</option>
                            {optionExpense}
                        </Form.Control>
                    </Form.Group>
                }
                <Form.Group>
                    <Form.Label>Amount:</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter amount"
                            value={amount}
                            onChange={ (e) => setAmount(e.target.value)}
                            required
                        />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Description"
                            value={description}
                            onChange={ (e) => setDescription(e.target.value)}
                            required
                        />
                </Form.Group>
                <Button type="submit" variant='primary'>Add</Button>
            </Form>
        </Container>
        </React.Fragment>
    )
}

export async function getStaticProps() {
    const res = await fetch(`http://localhost:4000/api/category`)
    const data = await res.json()
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: { data }, // will be passed to the page component as props
    }
  }