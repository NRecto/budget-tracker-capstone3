import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import styles from '../styles/Home.module.css'
// import UserContext from '../../UserContext';

export default function Profile() {


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