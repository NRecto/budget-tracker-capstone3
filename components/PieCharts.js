import React from "react";
import { Pie } from "react-chartjs-2";
import randomcolor from 'randomcolor';

export default function PieCharts({rawData}){

   const nameAsLabel = rawData.map( data => data.name)
   const amountAsData = rawData.map( data => data.amount)
   const bgColor = rawData.map( () => randomcolor() )
   
    const data = {
        labels: nameAsLabel,
        datasets: [
          {
            label: nameAsLabel,
            data: amountAsData,
            backgroundColor: bgColor
          }
        ]
      };
      const option ={
        options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              }
            }
          }
      }
    
    return (
        <React.Fragment>
            <Pie data={data} options={option}/>
        </React.Fragment>
    )
}