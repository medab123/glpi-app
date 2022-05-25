import React, { useState,useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);




function TicketResoluByEntiter(props) {
    const [chartData, setChartData] = useState(props.chartDaa)
    const [chartlebels, setChartlebels] = useState(props.chartLebels)
   
    useEffect(() => {
        
        setChartData(props.chartData)
        setChartlebels(props.chartLebels)
        
    })
    /*
    useEffect(() => {
        
        const interval = setInterval(() => {
            getdata();
          }, 1000);
          return () => clearInterval(interval);
        
    },[]);*/
    const data = {
        labels: chartlebels,
        datasets: [
            {
                label: "line",
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
                borderWidth: 2,
            },
        ],
    }
    var options = {
        tooltips: {
            enabled: false
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    return value;
                },
                color: 'black',
            }
        }
    };
    return (
        <div>
            <h1>Ticket Resolu par Entites</h1>
            <Bar options={options} plugins={[ChartDataLabels]} data={data} />
        </div>
    )
}
export default TicketResoluByEntiter;