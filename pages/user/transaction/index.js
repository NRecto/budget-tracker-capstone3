import React, {useContext, useEffect, useState} from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import Link from 'next/link';
import UserContext from '../../../UserContext';

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
        return data.name.toLowerCase().includes(search)
    }).map( data => {
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
    const searchedFilterExpense = expenseType.filter( data => {
        return data.name.toLowerCase().includes(search)
    }).map( data => {
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

    const showSearched = newData.filter( data => {
        return data.name.toLowerCase().includes(search)
    }).map( data => {
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
    

    // console.log(search.length)
    // console.log(showSearched)

    
    
    useEffect( () => {

    }, [type, search])
    
    return (
        <React.Fragment>
        <Container>
            <h1>Transaction History</h1>
            <Link href="/user/transaction/new" >
                <a className="btn btn-primary">Add Transaction</a>
            </Link>
            <Form>
            <Form.Group >
                <Form.Control 
                type="text" 
                placeholder="Search Transaction"
                value={search}
                onChange={ (e) => setSearch(e.target.value)} />
            </Form.Group>
                <Form.Group>
                    <Form.Label>Filter By Type:</Form.Label>
                    <Form.Control 
                    as="select" 
                    className="w-75"
                    value={type}
                    onChange={ (e) => setType(e.target.value)}
                    >
                        <option>Select All</option>
                        <option>Income</option>
                        <option>Expense</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            {
                type === "Select All"
                ?   search === 0
                    ?   <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Category Name</th>
                                <th>Category Type</th>
                                <th>Amount</th>
                                <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            {dataRow}
                            </tbody>
                        </Table>
                    :   <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Category Name</th>
                                <th>Category Type</th>
                                <th>Amount</th>
                                <th>Description</th>
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
                                    <th>Category Name</th>
                                    <th>Category Type</th>
                                    <th>Amount</th>
                                    <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {filterIncome}
                                </tbody>
                            </Table>
                        :   <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Category Name</th>
                                    <th>Category Type</th>
                                    <th>Amount</th>
                                    <th>Description</th>
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
                                        <th>Category Name</th>
                                        <th>Category Type</th>
                                        <th>Amount</th>
                                        <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {filterExpense}
                                    </tbody>
                                </Table>
                            :   <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>Category Name</th>
                                        <th>Category Type</th>
                                        <th>Amount</th>
                                        <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {searchedFilterExpense}
                                    </tbody>
                                </Table>
                        
            }
        </Container>
        </React.Fragment>
    )
}

export async function getStaticProps() {
    const res = await fetch(`http://localhost:4000/api/ledger`)
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

  /* 
  
  {
      type === "Select All" && search === 0
        ?   <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Category Name</th>
                    <th>Category Type</th>
                    <th>Amount</th>
                    <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                {dataRow}
                </tbody>
            </Table>
        : type === "Select All" && search > 0
            ?   <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Category Name</th>
                        <th>Category Type</th>
                        <th>Amount</th>
                        <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                    {showSearched}
                    </tbody>
                </Table>
            :   type === 'Income'
                    ? <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Category Name</th>
                            <th>Category Type</th>
                            <th>Amount</th>
                            <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filterIncome}
                        </tbody>
                    </Table>
                    :<Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Category Name</th>
                            <th>Category Type</th>
                            <th>Amount</th>
                            <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filterExpense}
                        </tbody>
                    </Table>

  }
  
  */

  /* 
  {
                type === 'Select All'
                ? <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Category Name</th>
                        <th>Category Type</th>
                        <th>Amount</th>
                        <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                    {dataRow}
                    </tbody>
                </Table>
                : type === 'Income'
                    ? <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Category Name</th>
                            <th>Category Type</th>
                            <th>Amount</th>
                            <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filterIncome}
                        </tbody>
                    </Table>
                    :<Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Category Name</th>
                            <th>Category Type</th>
                            <th>Amount</th>
                            <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filterExpense}
                        </tbody>
                    </Table>
            }
   */