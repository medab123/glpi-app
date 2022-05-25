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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);




function TicketByTechnicien(props) {
    const [chartData, setChartData] = useState((props.chartData))
    const [chartlebels, setChartlebels] = useState(props.chartLebels)
   
    useEffect(() => {
        
        setChartData(props.chartData)
        setChartlebels(props.chartLebels)
        
    })
    const data = {
        labels: chartlebels,
        datasets: [
            {
                label: 'tickets',
                data: chartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86,1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255,1)',
                    'rgba(255, 159, 64,1)',
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
        indexAxis: 'y',
        
    }
    return (
        <div>
            <h1>Ticket par Technicien</h1>
            <Bar options={options} data={data}  />
        </div>
    )
}
export default TicketByTechnicien;