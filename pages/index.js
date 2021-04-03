import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap'
import styles from '../styles/Home.module.css'

export default function Home() {

  
  return (
    <React.Fragment>
    <div className={styles.body} >
      <Container>

      <Row>
        <Col className={styles.landing_header}>
          <h1>BRAAAP ==</h1>
          <p>BUDGET YOUR TRAVEL AHEAD OF TIME  |  HAVE A STRESS FREE VACATION  |  MAXIMIZE YOUR MONEY (TYPE EFFECT)</p>
        </Col>
        <Col lg={12} className={styles.home_button}>
          <Button variant="outline-light" > Login </Button>
          <Button variant="outline-primary" className="ml-3 text-white"> Sign Up </Button>
        </Col>
      </Row>
    </Container>
    </div>
    </React.Fragment>
  )
}
