import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import BarChart from '../../../components/BarChart';
import UserContext from '../../../UserContext';
import styles from '../../../styles/BarChart.module.css';

export default function index({data}){

    const { user } = useContext(UserContext);

    const newData = data.filter( data => data.user === user.id)
    const userExpense = newData.filter( data => data.type === "Expense" );
    
    
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

export async function getStaticProps(){
    const res = await fetch('http://localhost:4000/api/ledger')
    const data = await res.json();

    return{
        props: {
            data
        }
    }
}