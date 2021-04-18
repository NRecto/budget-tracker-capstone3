import React, { useContext, useEffect, useState } from "react";
import {Form, Row, Col,Container} from 'react-bootstrap'
import moment from 'moment';
import PieCharts from '../../../components/PieCharts';
import UserContext from '../../../UserContext';

export default function breakdown(){
    const { user } = useContext(UserContext)
    const x = new Date();
    const [startDate, setStartDate] = useState(moment(x.setMonth(x.getMonth()-1)).format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [data, setData] =useState([]);

    const newData = data.filter( data => data.user === user.id).map( data => {
        return ({
            name: data.name,
            amount: data.amount,
            date: moment(data.createdOn).format("YYYY-MM-DD")
        })
    })
    const dateFilteredData = newData.sort( (a,b) => a.date < b.date ? 1 : -1 ).filter( data => {
        return (data.date >= startDate && data.date <= endDate)
    })

    useEffect( ()=> {
        fetch('https://protected-retreat-88721.herokuapp.com/api/ledger')
        .then( res => res.json() )
        .then( data => setData(data))

    }, [startDate, endDate, data])
    return (
        <React.Fragment>
        <h1 className='text-center'>Record Breakdown</h1>
            <Form>
            <Container>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>From:</Form.Label>
                            <Form.Control
                            type='date'
                            value={startDate}
                            onChange={ (e) => setStartDate(moment(e.target.value).format("YYYY-MM-DD"))}
                            > 
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    
                    <Col>
                        <Form.Group>
                            <Form.Label>To:</Form.Label>
                            <Form.Control
                            type='date'
                            value={endDate}
                            onChange={ (e) => setEndDate(moment(e.target.value).format("YYYY-MM-DD"))}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <PieCharts rawData={dateFilteredData} />
            </Container>
                
            </Form>
        </React.Fragment>
    )
}


