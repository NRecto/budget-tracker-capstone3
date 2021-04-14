import React, {useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from "react-datepicker";


// import moment from 'moment';

export default function BarChart({rawData}) {
    
    const [ amount, setAmount ] = useState([])
    const [balance,setBalance] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [month, setMonth] =useState()


    useEffect( () => {
        setAmount( rawData.map( data => {
            return data.amount
        }) )

            let total = 0;
            const userBalance = rawData.map( data => {
                
                if(data.type === 'Income'){
                    total = total + data.amount
                } else {
                    total = total - data.amount
                }

                return (total);
            } )
            setBalance(userBalance)

    }, [rawData]) 

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
            }
        }

    }
     
    console.log(startDate);
    return (
        <React.Fragment>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            <Line data={data} config={config} />  
        </React.Fragment>
    )
}

// mvtalan@gmail.com