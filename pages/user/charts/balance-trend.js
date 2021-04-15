import React, {useContext} from "react";
import LineChart from '../../../components/LineCharts';
import UserContext from '../../../UserContext';
import {Container} from 'react-bootstrap';
import styles from '../../../styles/BalanceTrend.module.css';


export default function balanceTrend({data}) {
    
    const { user } = useContext(UserContext);

    const newData = data.filter( data => data.user === user.id)
    return (
        <React.Fragment>
        <div className={styles.parentBody}>
        <Container>
            <div className={styles.mainBody}>
                <h1>Balance Trend</h1>
                <div className={styles.chart}>
                    <LineChart rawData={newData} />
                </div>
            </div>
        </Container>
        </div>
        </React.Fragment>
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