import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import styles from '../../styles/User.module.css';
import Swal from 'sweetalert2';
import moment from 'moment';
import Router from 'next/router';


export default function index({user, userTransaction, userCategory}) {
	const {firstName, lastName, savings} = user;

	const displayTransactHistory = userTransaction.map( data => {
		return ({
			id: data._id,
			name: data.name,
			type: data.type,
			amount: data.amount,
			description: data.description,
			date: moment(data.createdOn).format("YYYY-MM-DD h:mm:ss a"),
			isoDate: data.createdOn
		})
	}).sort( (a,b) => a.date < b.date ? 1 : -1).map( data => {
		let nameCapitalized = data.name.charAt(0).toUpperCase() + data.name.slice(1);
		
		let date = moment(data.isoDate).calendar();
		return (
				<div key={data.id} className={styles.record}>
				<Container>
					<Row className={styles.recordBody}>
						<Col>
							<Col>
								<h5>{data.description}</h5>
								<p className={styles.successParag}>	Transaction Success! </p>
								<p> {date}</p>
							</Col>
						</Col>
						<Col>
							{
								data.type === "Income"
								?	<>
										<p className={styles.amountGreen}>+ &#8369; {data.amount}</p>
										<p className={styles.amountGreen}>{nameCapitalized}</p>
									</>
								:	<>
										<p className={styles.amountRed}>- &#8369; {data.amount}</p>
										<p className={styles.amountRed}>{nameCapitalized}</p>
									</>
							}
						</Col>
					</Row>
						
				</Container>
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
	const [imgUrl, setImgUrl] = useState('');
	const [reset, setReset] = useState('');

    useEffect( ()=> {
        setToken(localStorage['token'])
        setImgUrl(localStorage['imgUrl'])
    }, [name, type, amount, description, reset])

    function addNewTransaction(e) {
        e.preventDefault();
        if( type !== true && name !== true) {
            
            fetch('https://protected-retreat-88721.herokuapp.com/api/ledger', {
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
				setReset('new')
            })
            
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Please Fill up all required fields.',
                icon: 'error'
            })
        }
        setReset('')
    }
	
	async function addCategory(e){
		Router.push('/categories/new')
		
	}
	
  return (

    <React.Fragment>
	<div className={styles.bodyContainer}>
	<Container fluid className={styles.profileBodyCont}>
        <Row className={styles.profileBody}>
          <Col md={5}>
            <div className={styles.profile}>
              <h2>Profile</h2>
			  <img
				src={imgUrl}
				alt='Profile Picture'
				className={styles.profilePicture}
			  />
              <p className={styles.profileUserProfile}></p>
              <p className={styles.profileUserName}>{lastName}, {firstName}</p>
              <p>Current Savings: <span className={styles.profileUserBalance}>&#8369; {savings}</span></p>
            </div>

			<div className={styles.addTransaction} >
				<h2>New Transaction</h2>
					<Form onSubmit={ (e)=> addNewTransaction(e)}>
					<Form.Group>
						<Form.Label>Category Type:</Form.Label>
						<Form.Control 
						as="select" 
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
								<div className='d-flex' >
									<Form.Control 
									as="select" 
									value={type}
									onChange={ (e) => setType(e.target.value)}
									required
									>
										<option value='true' disabled>Select</option>
									</Form.Control>
									<Button onClick={addCategory}>ADD</Button>
								</div>
								
						</Form.Group>
						:
						type === "Income"
						? <Form.Group>
							<Form.Label>Category Name:</Form.Label>
							<div className='d-flex' >
								<Form.Control 
								as="select" 
								value={name}
								onChange={ (e) => setName(e.target.value)}
								required
								>
									<option value='true' disabled>Select</option>
									{optionIncome}
								</Form.Control>
								<Button onClick={addCategory}>ADD</Button>
							</div>
						</Form.Group>
						: <Form.Group>
							<Form.Label>Category Name:</Form.Label>
							<div className='d-flex'>
								<Form.Control 
								as="select" 
								value={name}
								onChange={ (e) => setName(e.target.value)}
								required
								>
									<option value='true' disabled>Select</option>
									{optionExpense}
								</Form.Control>
								<Button onClick={addCategory}>ADD</Button>
							</div>
							
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
          <Col md={7}>
		  	<div className={styles.transaction} >
				<h2>Transaction History</h2>
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
	
	const res = await fetch('https://protected-retreat-88721.herokuapp.com/api/users/details-landing')
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

	const res = await fetch('https://protected-retreat-88721.herokuapp.com/api/users/details-landing')

    const data = await res.json()
	
	const user = data.find( user => user._id === params.id)
	// console.log(user)

	const res1 = await fetch(`https://protected-retreat-88721.herokuapp.com/api/ledger`)
    const transactionData = await res1.json()
	const userTransaction = transactionData.filter( user => user.user === params.id)

	const res2 = await fetch(`https://protected-retreat-88721.herokuapp.com/api/category`)
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

