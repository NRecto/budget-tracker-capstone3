import React, {useContext, useEffect, useState} from 'react';
import { Container, Table, Form, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import UserContext from '../../../UserContext';
import moment from 'moment';
import styles from '../../../styles/Transaction.module.css';

export default function index({data}) {

    const {user} = useContext(UserContext);
    const [type, setType] =useState('Select All');
    const [search, setSearch] =useState('');

    const newData = data.filter( categ => categ.user === user.id)
    const incomeType = newData.filter( data => data.type === 'Income')
    const expenseType = newData.filter( data => data.type === 'Expense')
    const dataRow = newData.map( data => { 
      let nameCapitalized = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        return (
            <tr key={data._id}>
                <td>{nameCapitalized}</td>
                <td>{data.type}</td>
                <td>{data.amount}</td>
                <td>{data.description}</td>
            </tr>
        )
    })
    const filterIncome = incomeType.map( data => {
        let nameCapitalized = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        return (
            <tr key={data._id}>
                <td>{nameCapitalized}</td>
                <td>{data.type}</td>
                <td>{data.amount}</td>
                <td>{data.description}</td>
            </tr>
        )
    })
    const filterExpense = expenseType.map( data => {
        let nameCapitalized = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        return (
            <tr key={data._id}>
                <td>{nameCapitalized}</td>
                <td>{data.type}</td>
                <td>{data.amount}</td>
                <td>{data.description}</td>
            </tr>
        )
    })
    const searchedFilterIncome = incomeType.filter( data => {
        return data.description.toLowerCase().includes(search)
    }).map( data => {
        let nameCapitalized = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        let date = moment(data.createdOn).calendar();
        return (
            <tr key={data._id}>
                <td>{date}</td>
                <td>{data.description}</td>
                <td>{nameCapitalized}</td>
                <td>{data.type}</td>
                <td>{data.amount}</td>
            </tr>
        )
    })
    const searchedFilterExpense = expenseType.filter( data => {
        return data.description.toLowerCase().includes(search)
    }).map( data => {
        let nameCapitalized = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        let date = moment(data.createdOn).calendar();
        return (
            <tr key={data._id}>
                <td>{date}</td>
                <td>{data.description}</td>
                <td>{nameCapitalized}</td>
                <td>{data.type}</td>
                <td>{data.amount}</td>
            </tr>
        )
    })

    const showSearched = newData.filter( data => {
        return data.description.toLowerCase().includes(search)
    }).map( data => {
        let nameCapitalized = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        let date = moment(data.createdOn).calendar();
        return (
            <tr key={data._id}>
                <td>{date}</td>
                <td>{data.description}</td>
                <td>{nameCapitalized}</td>
                <td>{data.type}</td>
                <td>{data.amount}</td>
            </tr>
        )
    })
    

    
    
    useEffect( () => {

    }, [type, search])

    return (
        <React.Fragment>
        <div className={styles.mainBody}>
            <Container>
            <div className={styles.head}>
                <h1>Transaction History</h1>
                <div className={styles.btn}>
                    <Link href="/user/transaction/new" >
                        <a className="btn btn-outline-primary" >Add Transaction</a>
                    </Link>
                </div>
                <div className={styles.filterForm}>
                        <Form.Group >
                            <Form.Control 
                            type="text" 
                            placeholder="Search Transaction"
                            value={search}
                            onChange={ (e) => setSearch(e.target.value)} />
                        </Form.Group>

                            <Form.Group>
                                <Form.Control 
                                as="select" 
                                value={type}
                                onChange={ (e) => setType(e.target.value)}
                                >
                                    <option value='Select All'>Filter by:</option>
                                    <option>Income</option>
                                    <option>Expense</option>
                                </Form.Control>
                            </Form.Group>
                </div>
            </div>
            <div className={styles.table}>
                {
                    type === "Select All"
                    ?   search === 0
                        ?   <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Category Name</th>
                                    <th>Category Type</th>
                                    <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {dataRow}
                                </tbody>
                            </Table>
                        :   <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Category Name</th>
                                    <th>Category Type</th>
                                    <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {showSearched}
                                </tbody>
                            </Table>
                    
                    :   type === 'Income'
                        ?   search === 0
                            ?   <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>Date</th>
                                    <th>Description</th>
                                    <th>Category Name</th>
                                    <th>Category Type</th>
                                    <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {filterIncome}
                                    </tbody>
                                </Table>
                            :   <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>Date</th>
                                    <th>Description</th>
                                    <th>Category Name</th>
                                    <th>Category Type</th>
                                    <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {searchedFilterIncome}
                                    </tbody>
                                </Table>
                        :   search === 0
                                ?   <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                            <th>Date</th>
                                            <th>Description</th>
                                            <th>Category Name</th>
                                            <th>Category Type</th>
                                            <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {filterExpense}
                                        </tbody>
                                    </Table>
                                :   <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                            <th>Date</th>
                                        <th>Description</th>
                                        <th>Category Name</th>
                                        <th>Category Type</th>
                                        <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {searchedFilterExpense}
                                    </tbody>
                                </Table>
                        
            }
            </div>
        </Container>
        </div>
        </React.Fragment>
    )
}

export async function getStaticProps() {
    const res = await fetch(`https://protected-retreat-88721.herokuapp.com/api/ledger`)
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

