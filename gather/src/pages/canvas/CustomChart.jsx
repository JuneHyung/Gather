import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.defaults.color = "#FFF"; // chart default color 설정
ChartJS.defaults.borderColor = "rgba(255,255,255,1)"; // chart default border color 설정
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend); // chart 등록

const CustomChart = ({labels, valueList}) => {
  const options = {
    //chart 옵션
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `날짜별 사망 수`,
      },
    },
  };

  const data = {
    // chart data 옵션설정
    labels,
    datasets: [
      {
        label: 'line01',
        data: valueList,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Line options={options} data={data}></Line>
  );
};

export default CustomChart;