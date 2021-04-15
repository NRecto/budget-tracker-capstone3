import Link  from 'next/link';
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import styles from '../styles/Landing.module.css'


export default function Landing() {

  return (
    <React.Fragment>
      <div className={styles.body} >
        <Container>

        <Row>
          <Col className={styles.landing_header}>
            <h1>BRAAAP</h1>
            <p>BUDGET YOUR TRAVEL AHEAD OF TIME  |  HAVE A STRESS FREE VACATION  |  MAXIMIZE YOUR MONEY</p>
          </Col>
          <Col lg={12} className={styles.home_button}>
              <Link href="/login" >
              <a className="btn btn-outline-light">Login</a>
              </Link>
              <Link href="/register" >
              <a className="btn btn-outline-primary ml-3">
                Sign Up
              </a>
              </Link>
          </Col>
        </Row>
      </Container>
      </div>
    </React.Fragment>
  )
}
