import React, {useState, useEffect, Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import styles from '../styles/BarChart.module.css'


export default function BarChart({rawData}) {
    
    const [ months, setMonths ] = useState([
        'January',
        'February',
        'March',
        'April',
        "May",
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ])
    const [expensePerMonth,setExpensePerMonth] = useState([]);
    const [labels, stLabels] = useState('');

    useEffect( () => {
        
        
        setExpensePerMonth(months.map( month => {
            let sales = 0;
            rawData.forEach( element => {
                if(moment(element.createdOn).format("MMMM") === month){
                    sales += parseInt(element.amount)
                }
            })
            // console.log(sales)
            return sales
        }))
        
    }, [rawData]) 

    const data ={        
                    labels: months,
                    datasets:[{
                        label: 'data',
                        backgroundColor: "blue" ,
                        borderColor: 'white',
                        borderWidth: 1,
                        hoverBackgroundColor: 'lightBlue',
                        hoverBorderColor: 'black',
                        data: expensePerMonth
                    }]
    }
    const options ={ 
        scales: {
            yAxes:[
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }
            
    return (
        <React.Fragment>   
                <Bar data={data} options={options} />  
        </React.Fragment>
    )
}