import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Container, Table } from 'react-bootstrap';
import Link from 'next/link';
import UserContext from '../../UserContext'

export default function index({data}){

    // console.log(data)
    const {user} = useContext(UserContext);
    const newData = data.filter( categ => categ.user === user.id)
    const dataRow = newData.map( data => { 
      let nameCapitalized = data.name.charAt(0).toUpperCase() + data.name.slice(1);

        return (
            <tr key={data._id}>
                <td>{nameCapitalized}</td>
                <td>{data.type}</td>
            </tr>
        )
    })
    
    useEffect( () =>{
        
    }, [])
  
    return (
        <React.Fragment>
        <Container>
            <h1>Categories</h1>
            <Link href="/categories/new" >
                <a className="btn btn-primary">Add Category</a>
            </Link>
            {/* <Button onClick={awit}>click</Button> */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Category Name</th>
                    <th>Category Type</th>
                    </tr>
                </thead>
                <tbody>
                   {dataRow}
                </tbody>
        </Table>
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
