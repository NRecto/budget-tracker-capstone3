import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import styles from '../../styles/Home.module.css';
import Swal from 'sweetalert2';
import Router from 'next/router';
// import UserContext from '../../UserContext';

export default function index({user, userTransaction, userCategory}) {
	const {firstName, lastName, savings} = user;

	const displayTransactHistory = userTransaction.map( data => {
		return (
				<div key={data._id}>
					<p>Name: {data.name}</p>
					<p>Type: {data.type}</p>
					<p>Amount: {data.amount}</p>
					<p>Description: {data.description}</p>
					<p>Date: {data.createdOn}</p>
				</div>
		)
	})

	const newData = userCategory.filter( categ => categ.user === user._id)
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
        if( type !== true && name !== true) {
            
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
                }
            })
            
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Please Fill up all required fields.',
                icon: 'error'
            })
        }
        
    }
	
  return (

    <React.Fragment>
      <div className={styles.body} >
        <Container className={styles.profileBodyCont}>

        <Row className={styles.profileBody}>
          <Col  md={5}>
            <div className={styles.profile}>
              <h1>Profile</h1>
              <p className={styles.profileUserProfile}></p>
              <p className={styles.profileUserName}>{firstName} {lastName}</p>
              <p className={styles.profileUserBalance}>{savings}</p>
            </div>

			<div className={styles.addTransaction} >
				<h1>Add New Transaction</h1>
					<Form onSubmit={ (e)=> addNewTransaction(e)}>
					<Form.Group>
						<Form.Label>Category Type:</Form.Label>
						<Form.Control 
						as="select" 
						className="w-75"
						value={type}
						onChange={ (e) => setType(e.target.value)}
						required
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
								required
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
							required
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
							required
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
			</div>
          </Col>
          <Col  md={6}>
		  	<div className={styles.transaction} >
				<h1>History</h1>
			</div>
				{displayTransactHistory}
          </Col>
        </Row>
      </Container>
      </div>
    </React.Fragment>
  )
}

export async function getStaticPaths(){
	
	const res = await fetch('http://localhost:4000/api/users/details-landing')
    const data = await res.json();
	
	const paths = data.map( user => {
		return {
			params : {id : user._id}
		}
	})
	// console.log(paths)

	return { paths, fallback:false}


}

export async function getStaticProps({params}){

	const res = await fetch('http://localhost:4000/api/users/details-landing')

    const data = await res.json()
	
	const user = data.find( user => user._id === params.id)
	// console.log(user)

	const res1 = await fetch(`http://localhost:4000/api/ledger`)
    const transactionData = await res1.json()
	const userTransaction = transactionData.filter( user => user.user === params.id)

	const res2 = await fetch(`http://localhost:4000/api/category`)
    const categoryData = await res2.json();
	const userCategory = categoryData.filter( user => user.user === params.id)
	return {
		props : {
			user,
			userTransaction,
			userCategory
		}
	}
}

