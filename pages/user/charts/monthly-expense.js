import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BarChart from '../../../components/BarChart';
import UserContext from '../../../UserContext';
import styles from '../../../styles/BarChart.module.css';

export default function index(){

    const { user } = useContext(UserContext);
    const [data, setData] = useState([])
    const newData = data.filter( data => data.user === user.id)
    const userExpense = newData.filter( data => data.type === "Expense" );
    useEffect( () => {
        fetch('https://protected-retreat-88721.herokuapp.com/api/ledger')
        .then( res => res.json() )
        .then( data => setData(data))
    }, [])
    
    return (
        <div className={styles.body}>
        <Container>
            <div className={styles.main}>
                <h1>Monthly Expense</h1>
                <div className={styles.chart}>
                    <BarChart rawData={userExpense} />
                </div>
            </div>
        </Container>
        </div>
        
    )
}

