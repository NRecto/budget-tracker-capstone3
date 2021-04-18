import React, {useContext, useEffect, useState} from "react";
import LineChart from '../../../components/LineCharts';
import UserContext from '../../../UserContext';
import {Container} from 'react-bootstrap';
import styles from '../../../styles/BalanceTrend.module.css';
import { setDefaultLocale } from "react-datepicker";


export default function balanceTrend() {
    
    const { user } = useContext(UserContext);
    const [data, setData] = useState([])
    const newData = data.filter( data => data.user === user.id)
    useEffect( () =>{
        fetch('https://protected-retreat-88721.herokuapp.com/api/ledger')
        .then( res => res.json() )
        .then( data => setData(data) )
    }, [])
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

