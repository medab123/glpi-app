import logo from './logo.svg';
import './App.css';
import TicketByEntiter from './charts/TicketByEntiter';
import TicketByTechnicien from './charts/TicketByTechnicien';
import SatisfactionByTechnicien from './charts/SatisfactionByTechnicien';
import SatisfactionByEntiter from './charts/SatisfactionByEntiter';
import TicketResoluByEntiter from './charts/TicketResoluByEntiter'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState, useEffect } from 'react';
import ab from './API/abcd';
import axios from 'axios';



function App() {
  const [chartDataSatisfactionByTechnicien, setChartDataSatisfactionByTechnicien] = useState([])
  const [chartlebelsSatisfactionByTechnicien, setChartlebelsSatisfactionByTechnicien] = useState([])
  const [chartDataSatisfactionByEntiter, setChartDataSatisfactionByEntiter] = useState([])
  const [chartlebelsSatisfactionByEntiter, setChartlebelsSatisfactionByEntiter] = useState([])
  const [chartDataTicketResoluByEntiter, setChartDataTicketResoluByEntiter] = useState([])
  const [chartlebelsTicketResoluByEntiter, setChartlebelsTicketResoluByEntiter] = useState([])
  const [chartDataTicketByEntiter, setChartDataTicketByEntiter] = useState([])
  const [chartlebelsTicketByEntiter, setChartlebelsTicketByEntiter] = useState([])
  const [chartDataTicketByTechnicien, setChartDataTicketByTechnicien] = useState([])
  const [chartlebelsTicketByTechnicien, setChartlebelsTicketByTechnicien] = useState([])
  const [isChecked, setIsChecked] = useState(true)
  const [timeInterval, setTimeInterval] = useState(2000)

  const apiServer = "http://10.60.0.116/api/public";

  const ticketByTechnicien = async (d1, d2) => {
    await axios.get(apiServer + `/ticketByTechnicien/` + d1 + '/' + d2)
      .then(res => {
        setChartlebelsTicketByTechnicien(res.data.map(res => res.technicien));
        setChartDataTicketByTechnicien(res.data.map(res => res.valeu));
      })
  }
  const ticketByEntiter = async (d1, d2) => {
    await axios.get(apiServer + `/ticketParEntiter/` + d1 + '/' + d2)
      .then(res => {
        setChartlebelsTicketByEntiter(res.data.map(res => res.entities));
        setChartDataTicketByEntiter(res.data.map(res => res.valeu));
      })
  }
  const ticketResoluByEntiter = async (d1, d2) => {
    await axios.get(apiServer + `/ticketResoluByEntiter/` + d1 + '/' + d2)
      .then(res => {
        setChartlebelsTicketResoluByEntiter(res.data.map(res => res.name));
        setChartDataTicketResoluByEntiter(res.data.map(res => res.nombreTickts));
      })
  }

  const satisfactionByTechnicien = async (d1, d2) => {
    await axios.get(apiServer + `/satisfactionByTechnicien/` + d1 + '/' + d2)
      .then(res => {
        setChartlebelsSatisfactionByTechnicien(res.data.map(res => res.realname));
        setChartDataSatisfactionByTechnicien(res.data.map(res => res.moyenne));
      })
  }
  const satisfactionByEntiter = async (d1, d2) => {
    await axios.get(apiServer + `/satisfactionByEntiter/` + d1 + '/' + d2)
      .then(res => {
        setChartlebelsSatisfactionByEntiter(res.data.map(res => res.name));
        setChartDataSatisfactionByEntiter(res.data.map(res => res.moyenne));
      })

  }
  const [date1, setDate1] = useState('2000-01-01'); // '' is the initial state value
  const [date2, setDate2] = useState('2022-01-01'); // '' is the initial state value
  const refresh = () => {
    setDate1(document.getElementById('date1').value);
    setDate2(document.getElementById('date2').value);
  }
  useEffect(() => {
    if (timeInterval < 500) return
    if (isChecked) {
      let newDate = new Date()
      let day = String(newDate.getDate());
      let month = newDate.getMonth() + 1;
      let year = String(newDate.getFullYear());
      let date1 = year+'-0'+month+'-'+day
      let date2 = year+'-0'+String(month-1)+'-01'
      setDate2(date1)
      setDate1(date2)
      console.log(date2);
    }
    const timer = setInterval(() => {
      console.log("reloading")
      ticketByTechnicien(date1, date2)
      ticketByEntiter(date1, date2)
      satisfactionByEntiter(date1, date2)
      satisfactionByTechnicien(date1, date2)
      ticketResoluByEntiter(date1, date2)
      console.log(timeInterval)
    }, timeInterval);
    return () => {
      clearInterval(timer);
    };

  }, [date1, date2, timeInterval, isChecked])

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked)
  };

  return (

    <div className="App">
      <div className='row py-3' style={{ backgroundColor: 'black', color: '#fff' }} >
        <div className='col-xm-12 col-md-6 '>
          <input type={'checkbox'} value="yes" checked={isChecked} onChange={handleOnChange} />
          <label className='mx-2' >Auto Refresh</label>
          <input className={'mx-2 ' + (isChecked ? '' : 'd-none')} type={'number'} value={timeInterval} min="500" max="20000" onChange={(e) => setTimeInterval(e.target.value)} id="auto" />
          <input className={'mx-2 ' + (isChecked ? 'd-none' : '')} type={'date'} value={date1} placeholder="yyyy-mm-dd" id='date1' onChange={refresh} />
          <input className={(isChecked ? 'd-none' : '')} type={'date'} value={date2} placeholder="yyyy-mm-dd" id='date2' onChange={refresh} />
        </div>
        <div className={'col-xm-12 col-md-6 '+ (isChecked ? '' : 'd-none')}>
          <h3>{String(new Date())}</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-xm-12 col-md-6 col-lg-4'>
          <SatisfactionByTechnicien chartLebels={chartlebelsSatisfactionByTechnicien} chartData={chartDataSatisfactionByTechnicien} />
        </div>
        <div className='col-xm-12 col-md-6 col-lg-4'>
          <SatisfactionByEntiter chartLebels={chartlebelsSatisfactionByEntiter} chartData={chartDataSatisfactionByEntiter} />
        </div>
        <div className='col-xm-12 col-md-6 col-lg-4'>
          <TicketResoluByEntiter chartLebels={chartlebelsTicketResoluByEntiter} chartData={chartDataTicketResoluByEntiter} />
        </div>
        <div className='col-xm-12 col-md-6 col-lg-4'>
          <TicketByTechnicien chartLebels={chartlebelsTicketByTechnicien} chartData={chartDataTicketByTechnicien} />
        </div>
        <div className='col-xm-12 col-md-6 col-lg-4'>
          <TicketByEntiter chartLebels={chartlebelsTicketByEntiter} chartData={chartDataTicketByEntiter} />
        </div>
      </div>
    </div>
  );
}

export default App;
