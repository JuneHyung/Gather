
import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";
ChartJS.defaults.color="#FFF";
ChartJS.defaults.borderColor="rgba(255,255,255,1)";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);
const CoronaChart = ({ cityName, labels, valueList,}) =>{
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${cityName} 날짜별 사망 수`,
      },
    },
  }
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        label: cityName,
        data: valueList,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <div className='corona-chart-canvas'>
      <Line options={options} data={data}></Line>
    </div>
  )
}

export default CoronaChart;