import React, {useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

export default function BarChart({rawData}) {
    
    const [ amount, setAmount ] = useState([])
    const [balance,setBalance] = useState([]);

    useEffect( () => {
        setAmount( rawData.map( data => {
            return data.amount
        }) )

            let total = 0;
            const userBalance = rawData.map( data => {
                console.log(data)
                
                if(data.type === 'Income'){
                    total = total + data.amount
                } else {
                    total = total - data.amount
                }
                console.log(total)
                return (total);
            } )
            setBalance(userBalance)
        console.log(userBalance)
    }, [rawData]) 

    const data ={        
                    labels: amount,
                    datasets:[
                        {
                            label: 'Monthly Expense',
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
            
    return (
        <React.Fragment>
            <Line data={data} config={config} />  
        </React.Fragment>
    )
}