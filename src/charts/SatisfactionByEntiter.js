import React, { useState,useEffect } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';import {
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




function SatisfactionByEntiter(props) {
    const [chartData, setChartData] = useState(props.chartDaa)
    const [chartlebels, setChartlebels] = useState(props.chartLebels)
    useEffect(()=>{
        setChartData(props.chartData)
        setChartlebels(props.chartLebels)   
    })
   

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
                borderWidth: 1,
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
                    let percentage = (value*100 / 5).toFixed(2)+"%";
                    return percentage;
                },
                
                color: 'black',
            }
        }
    };
    return (
        <div>
            <h1>Satisfaction par Entites</h1>
            <Bar  data={data} plugins={[ChartDataLabels]} options={options} />
        </div>
    )
}
export default SatisfactionByEntiter;