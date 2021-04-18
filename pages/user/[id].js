import React, { useState, useEffect, useContext } from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import styles from '../../styles/User.module.css';
import Swal from 'sweetalert2';
import moment from 'moment';
import Router from 'next/router';
import UserContext from '../../UserContext';


export default function index() {
	
	const {user} = useContext(UserContext);
	const [token, setToken] = useState('')
    const [type, setType] = useState(true);
    const [name, setName] = useState(true);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
	const [imgUrl, setImgUrl] = useState('');
	const [loggedUser, setLoggedUser] = useState([])
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [savings, setSavings] = useState('');
	const [userCategory, setUserCategory] = useState([]);
	const [userTransaction, setUserTransaction] = useState([]);

	const filterLoggedUser = loggedUser.filter( data => data._id === user.id).map( data => {
		return (
			<div key={data._id}>
				<p className={styles.profileUserProfile}></p>
				<p className={styles.profileUserName}>{data.lastName}, {data.firstName}</p>
				<p>Current Savings: <span className={styles.profileUserBalance}>&#8369; {data.savings}</span></p>
			</div>
		)
	})

	
	const displayTransactHistory = userTransaction.filter(data => data.user === user.id).map( data => {
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

	

	const newData = userCategory.filter( categ => categ.user === user.id)
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

    useEffect( ()=> {
		setToken(localStorage['token'])
        setImgUrl(localStorage['imgUrl'])
		 fetch('https://protected-retreat-88721.herokuapp.com/api/users/details-landing')
		.then( res => res.json() )
		.then( data => setLoggedUser(data) )

		fetch('https://protected-retreat-88721.herokuapp.com/api/ledger')
		.then( res => res.json() )
		.then( data => setUserTransaction(data) );

		fetch('https://protected-retreat-88721.herokuapp.com/api/category')
		.then( res => res.json() )
		.then( data => setUserCategory(data) );
		
    }, [name, type, amount, description])

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
				setType(true)
				setName(true)
				setAmount('')
				setDescription('')
            })
            
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Please Fill up all required fields.',
                icon: 'error'
            })
        }

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
              {filterLoggedUser}
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

// export async function getStaticPaths(){
	
// 	const res = await fetch('https://protected-retreat-88721.herokuapp.com/api/users/details-landing')
//     const data = await res.json();
	
// 	const paths = data.map( user => {
// 		return {
// 			params : {id : user._id}
// 		}
// 	})
// 	// console.log(paths)

// 	return { paths, fallback:false}


// }