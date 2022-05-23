import React, { useState,useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import axios from 'axios';
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(ArcElement, Tooltip, Legend);




function TicketByEntiter(props) {
    const [chartData, setChartData] = useState(props.chartDaa)
    const [chartlebels, setChartlebels] = useState(props.chartLebels)
   
    useEffect(() => {
        
        setChartData(props.chartData)
        setChartlebels(props.chartLebels)
        
    })
    const data = {
        labels: chartlebels,
        datasets: [
            {

                data: chartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
    const options = {
        
      };
    return (
        <div>
            <h1>Ticket By Entiter</h1>
            <Doughnut  data={data} />
        </div>
    )
}
export default TicketByEntiter;