import React, {useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import moment from 'moment';



export default function BarChart({rawData}) {
    let x = new Date();
    const [ amount, setAmount ] = useState([])
    const [balance,setBalance] = useState([]);
    const [startDate, setStartDate] = useState(x.setMonth(x.getMonth()-1));
    const [endDate, setEndDate] = useState(new Date());
    const [dataPerMonth, setDataPerMonth] =useState();
    
    const changedDateData = rawData.map( data => {
        return ({
            date: data.createdOn,
            amount:data.amount,
            type: data.type
        })
    })
    const sortedData = changedDateData.sort( (a,b) => a.date < b.date ? -1 : 1).filter( data => {
        return (moment(data.date).format('MM DD YYYY') >= moment(startDate).format('MM DD YYYY') && moment(data.date).format('MM DD YYYY') <= moment(endDate).format('MM DD YYYY'));
    })

    
    
    useEffect( () => {
        // data on selected month
        // setDataPerMonth( rawData.ma)
        
        // data amount
        setAmount( sortedData.map( data => {
            return data.amount
        }) )
        
        let total = 0;
        const userBalance = sortedData.map( data => {
            
                if(data.type === 'Income'){
                    total = total + data.amount
                } else {
                    total = total - data.amount
                }

                return (total);
            } )
            setBalance(userBalance)

    }, [rawData, startDate, endDate]) 

    const data ={        
                    labels: amount,
                    datasets:[
                        {
                            label: 'Current Balance',
                            backgroundColor: "#ffcccc" ,
                            borderColor: 'red',
                            data: balance
                        }
                ]
    }
    const config = {
        options: {
            plugins: {
                filler: {
                  propagate: false,
                }
            },
            pointBackgroundColor: '#fff',
            radius: 10,
            interaction: {
              intersect: false,
            },
            
        },
    }

    return (
        <React.Fragment>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
            <Line data={data} config={config} />  
        </React.Fragment>
    )
}
