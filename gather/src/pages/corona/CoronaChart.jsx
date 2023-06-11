import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import NoData from "../../components/corona/NoData";
import { useSelector } from "react-redux";

ChartJS.defaults.color = "#FFF"; // chart default color 설정
ChartJS.defaults.borderColor = "rgba(255,255,255,1)"; // chart default border color 설정
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend); // chart 등록

const CoronaChart = ({ cityName, labels, valueList }) => {
  const { deathList } = useSelector((state) => state.death);
  const options = { //chart 옵션
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${cityName} 날짜별 사망 수`,
      },
    },
  };

  const data = { // chart data 옵션설정
    labels,
    datasets: [
      {
        label: cityName,
        data: valueList,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };


  return (
    <>
      {deathList.length !== 0 ? (
        <div className="corona-chart-canvas">
          <Line options={options} data={data}></Line>
        </div>
      ) : (
        <NoData></NoData>
      )}
    </>
  );
};

export default CoronaChart;
