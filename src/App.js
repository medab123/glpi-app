import logo from './logo.svg';
import './App.css';
import TicketByEntiter from './charts/TicketByEntiter';
import TicketByTechnicien from './charts/TicketByTechnicien';
import SatisfactionByTechnicien from './charts/SatisfactionByTechnicien';
import SatisfactionByEntiter from './charts/SatisfactionByEntiter';
import TicketResoluByEntiter from './charts/TicketResoluByEntiter'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState, useEffect } from 'react';
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

  //const apiServer = "http://10.60.0.116/api/public";
  const apiServer = "http://lacq.elephant-vert.com:666/api/public/api";
  
  
  //const apiServer = "http://localhost:8000/api";

  

  const ticketByTechnicien = async (d1, d2) => {
    await axios.post(apiServer + `/ticketByTechnicien/`,{date1:d1,date2:d2})
      .then(res => {
        setChartlebelsTicketByTechnicien(res.data.map(res => res.technicien));
        setChartDataTicketByTechnicien(res.data.map(res => res.valeu));
      })
  }
  const ticketByEntiter = async (d1, d2) => {
    await axios.post(apiServer + `/ticketParEntiter/` ,{date1:d1,date2:d2})
      .then(res => {
        setChartlebelsTicketByEntiter(res.data.map(res => res.entities));
        setChartDataTicketByEntiter(res.data.map(res => res.valeu));
      })
  }
  const ticketResoluByEntiter = async (d1, d2) => {
    await axios.post(apiServer + `/ticketResoluByEntiter/`  ,{date1:d1,date2:d2})
      .then(res => {
        setChartlebelsTicketResoluByEntiter(res.data.map(res => res.name));
        setChartDataTicketResoluByEntiter(res.data.map(res => res.nombreTickts));
      })
  }

  const satisfactionByTechnicien = async (d1, d2) => {
    await axios.post(apiServer + `/satisfactionByTechnicien/`  ,{date1:d1,date2:d2})
      .then(res => {
        setChartlebelsSatisfactionByTechnicien(res.data.map(res => res.realname));
        setChartDataSatisfactionByTechnicien(res.data.map(res => res.moyenne));
      })
  }
  const satisfactionByEntiter = async (d1, d2) => {
    await axios.post(apiServer + `/satisfactionByEntiter/`  ,{date1:d1,date2:d2})
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
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalSatisfaction, setTotalSatisfaction] = useState(0);
  const getTotalTickets = () => {
    let sum = 0
    chartDataTicketByTechnicien.map(data => {
      sum += data;
    });
    setTotalTickets(sum)
  }
  const getTotalSatisfaction = () => {
    let sum = 0.0
    let count = chartDataSatisfactionByEntiter.length
    chartDataSatisfactionByEntiter.map(data => {
      sum += parseFloat(data);
    });
    setTotalSatisfaction((sum * 100 / (count * 5)).toFixed(2))
  }

  useEffect(() => {
    getTotalTickets()
    getTotalSatisfaction()
    
  })
  useEffect(() => {
    if (timeInterval < 500) return
    if (isChecked) {
      let newDate = new Date()
      let day = String(newDate.getDate());
      let month = newDate.getMonth() + 1;
      let year = String(newDate.getFullYear());
      let date1 = year + '-0' + month + '-' + day
      let date2 = year + '-0' + String(month - 1) + '-01'
      setDate2(date1)
      setDate1(date2)
    }
    const timer = setInterval(() => {
      console.log("reloading")

      ticketByTechnicien(date1, date2)
      ticketByEntiter(date1, date2)
      satisfactionByEntiter(date1, date2)
      satisfactionByTechnicien(date1, date2)
      ticketResoluByEntiter(date1, date2)
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

    <div className="App" style={{ overflowX: "hidden" }}>
      <div className='row py-2' style={{ backgroundColor: 'black', color: '#fff' }} >
              <div className='col-xm-12 col-md-6 '>
                <input type={'checkbox'} value="yes" checked={isChecked} onChange={handleOnChange} />
                <label className='mx-2' >Auto Refresh</label>
                <input className={'mx-2 ' + (isChecked ? '' : 'd-none')} type={'number'} value={timeInterval} min="500" max="20000" onChange={(e) => setTimeInterval(e.target.value)} id="auto" />
                <input className={'mx-2 ' + (isChecked ? 'd-none' : '')} type={'date'} value={date1} placeholder="yyyy-mm-dd" id='date1' onChange={refresh} />
                <input className={(isChecked ? 'd-none' : '')} type={'date'} value={date2} placeholder="yyyy-mm-dd" id='date2' onChange={refresh} />
              </div>
              <div className={'col-xm-12 col-md-6 ' + (isChecked ? '' : 'd-none')}>
                <h4>{String(new Date())}</h4>
              </div>
            </div>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators d-xm-none">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className='mx-2 my-2' style={{ backgroundColor: '#cbced4', borderRadius: '20px', color: 'black' }}>
              <div className='row justify-content-md-center'>
                <div className='col-xm-6 col-md-3 d-iniline ' >
                  <div className='m-2 px-4 py-1' style={{ backgroundColor: '#fff', color: 'rgba(255, 99, 132, 1)', borderRadius: '20px', height: '80px', textAlign: 'left' }}>
                    <h5 className='m-0'>TOTAL TICKET</h5>
                    <b style={{ display: 'flex', justifyContent: 'center' }}>{totalTickets} Teckets</b>
                  </div>
                </div>
                <div className='col-xm-6 col-md-3 d-iniline' >
                  <div className='m-2 px-4 py-1' style={{ backgroundColor: '#fff', color: 'rgba(54, 162, 235, 1)', borderRadius: '20px', height: '80px', textAlign: 'left' }}>
                    <h5 className='m-0'>TOTAL SATISFACTION %</h5>
                    <b style={{ display: 'flex', justifyContent: 'center' }}>{totalSatisfaction}%</b>
                  </div>
                </div>
                <div className='col-xm-6 col-md-3 d-iniline' >
                  <div className='m-2 px-4 py-1' style={{ backgroundColor: '#fff', color: 'rgba(153, 102, 255, 1)', borderRadius: '20px', height: '80px', textAlign: 'left' }}>
                    <h5 className='m-0'>TEMP DE REPONCE</h5>
                    <b style={{ display: 'flex', justifyContent: 'center' }}>50 min</b>
                  </div>
                </div>

              </div>
            </div>
            <div className='m-2' style={{ backgroundColor: '#cbced4', borderRadius: '20px' }}>
              <div className='d-inline-block bar-charts' style={{}}>
                <div className='row mt-3 p-1' >
                  <div className='col-xm-12 col-md-6 ' >
                    <div className='m-1 mb-3' style={{ backgroundColor: '#fff', borderRadius: '20px' }}>
                      <SatisfactionByTechnicien chartLebels={chartlebelsSatisfactionByTechnicien} chartData={chartDataSatisfactionByTechnicien} />
                    </div>
                  </div>
                  <div className='col-xm-12 col-md-6 ' >
                    <div className='m-1 mb-3' style={{ backgroundColor: '#fff', borderRadius: '20px' }}>
                      <SatisfactionByEntiter chartLebels={chartlebelsSatisfactionByEntiter} chartData={chartDataSatisfactionByEntiter} />
                    </div>
                  </div>

                  <div className='col-xm-12 col-md-6 ' >
                    <div className='m-1 mb-3' style={{ backgroundColor: '#fff', borderRadius: '20px' }}>
                      <TicketByTechnicien chartLebels={chartlebelsTicketByTechnicien} chartData={chartDataTicketByTechnicien} />
                    </div>
                  </div>
                  <div className='col-xm-12 col-md-6 c' >
                    <div className='m-1 mb-3' style={{ backgroundColor: '#fff', borderRadius: '20px' }}>
                      <TicketResoluByEntiter chartLebels={chartlebelsTicketResoluByEntiter} chartData={chartDataTicketResoluByEntiter} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='d-md-inline-block donat-chart'>
                <div className='row' >
                  <div className='col-xm-12 '>
                    <div className='m-1 mb-3' style={{ backgroundColor: '#fff', borderRadius: '20px' }}>
                      <TicketByEntiter chartLebels={chartlebelsTicketByEntiter} chartData={chartDataTicketByEntiter} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">


            <div style={{ backgroundColor: 'black', width: '100%', height: '1000px' }} className="d-block "></div>



          </div>
        </div>
        <button className="carousel-control-prev d-xm-none" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next d-xm-none" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default App;
