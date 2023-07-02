import CustomChart from "./CustomChart";
import LineChart from "../../components/canvas/LineChart";

const chartData = {
  labels: ["2023-06-22", "2023-06-23", "2023-06-24", "2023-06-25", "2023-06-26", "2023-06-27", "2023-06-28", "2023-06-29"],
  step:5,
  datasets: [
    {
      label: "Sales",
      data: [12, 15, 20, 23, 24, 29, 30, 123],
      backgroundColor: "rgb(255, 99, 132)", // 차트의 채우기 색상
      borderColor: "rgb(255, 99, 132)", // 차트의 테두리 색상
      borderWidth: 1, // 테두리의 두께
    },
    {
      label: "Sales02",
      data: [10,30,50,42,88,90,46,55],
      backgroundColor: "blue", // 차트의 채우기 색상
      borderColor: "blue", // 차트의 테두리 색상
      borderWidth: 1, // 테두리의 두께
    },
    {
      label: "Sales03",
      data: [12,8,67,91,20,55,45,33],
      backgroundColor: "green", // 차트의 채우기 색상
      borderColor: "green", // 차트의 테두리 색상
      borderWidth: 1, // 테두리의 두께
    },
  ],
};

const CanvasChart = () => {
  const {labels, datasets} = chartData
  return (
    <div className="canvas-chart-wrap-box">
      <div className="canvas-chart-content-wrap">
        <LineChart data={chartData}></LineChart>
        <hr />
        <div className="bottom-box">
          <h2>Chart.js</h2>
          <CustomChart className="chartjs-box" labels={labels} valueList={datasets[0].data}></CustomChart>
        </div>
      </div>
    </div>
  );
};

export default CanvasChart;
