import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Container, Table } from 'react-bootstrap';
import Link from 'next/link';
import UserContext from '../../UserContext';
import styles from '../../styles/Categories.module.css';

export default function index(){


    const {user} = useContext(UserContext);

    const [data, setData] = useState([]);
    
    const newData = data.filter( categ => categ.user === user.id);
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
      fetch(`https://protected-retreat-88721.herokuapp.com/api/category`)
      .then( res => res.json() )
      .then( data => setData(data) )
    }, [])
  
    return (
        <React.Fragment>
          <div className={styles.mainBody}>
            <Container>
            <div className={styles.body}>
              <div className={styles.head}>
                <h1>Categories</h1>
                <Link href="/categories/new" >
                    <a className="btn btn-primary">Add Category</a>
                </Link>
              </div>
              <div className={styles.table} >
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
              </div>
            </div>
            </Container>
          </div>
        </React.Fragment>
    )
}

