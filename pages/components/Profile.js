import React, { useContext, useEffect } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap'
import styles from '../../styles/Home.module.css'
import UserContext from '../../UserContext';

export default function Profile({data}) {

  console.log(data)
  const {user} = useContext(UserContext)
  // console.log(user)
  
  useEffect( () => {
  })
  
  return (
    <React.Fragment>
      <div className={styles.body} >
        <Container>

        <Row>
          <Col className={styles.profile}>
            <h1>Profile</h1>
          </Col>
          <Col className={styles.transaction}>
            <h1>History</h1>
          </Col>
          <Col className={styles.addTransaction}>
            <h1>Add New Transaction</h1>
          </Col>
        </Row>
      </Container>
      </div>
    </React.Fragment>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:4000/api/users/details-landing`)
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