import { useEffect, useRef } from "react";
import CustomChart from "./CustomChart";

const cLabels = ["2023-06-22", "2023-06-23", "2023-06-24", "2023-06-25", "2023-06-26", "2023-06-27", "2023-06-28", "2023-06-29"];
const cValueList = [8, 15, 20, 23, 24, 29, 30, 54];
const chartData = {
  labels: ["2023-06-22", "2023-06-23", "2023-06-24", "2023-06-25", "2023-06-26", "2023-06-27", "2023-06-28", "2023-06-29"],
  datasets: [
    {
      label: "Sales",
      data: [8, 15, 20, 23, 24, 29, 30, 54],
      backgroundColor: "rgba(0, 123, 255, 0.5)", // 차트의 채우기 색상
      borderColor: "rgba(0, 123, 255, 1)", // 차트의 테두리 색상
      borderWidth: 1, // 테두리의 두께
    },
  ],
};

const CanvasChart = () => {
  const draw = () => {
    const topBox = document.getElementById("top-box");
    const canvas = document.getElementById("custom-chart");
    // 캔버스 크기 설정
    // canvas.width = topBox.clientWidth; // 캔버스 너비
    // canvas.height = topBox.clientHeight; // 캔버스 높이
    canvas.width = 1000; // 캔버스 너비
    canvas.height = 500; // 캔버스 높이

    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      const xAxisLabels = chartData.labels;
      const datasets = chartData.datasets;
      // 최소 최대수를 가지고 yAxis에 표시될 배열 만들기
      const makeYAxis = () => {
        const minD = Math.min(...datasets[0].data);
        const maxD = Math.max(...datasets[0].data);
        const step = 5;
        const start = minD - (minD % 5);
        const end = maxD - (maxD % 5) + step;
        const len = Math.ceil((end - start) / 5) + 1;

        const arr = Array.from({ length: len }, (_, i) => start + i * step);
        return arr;
      };
      // 초기 xAxis draw
      const drawXAxis = () => {
        // const yAxisMaxValue  = Math.max(...data);
        const xAxisStartX = 50; // x-axis 시작 위치
        const xAxisEndX = canvas.width - 50; // x-axis 끝 위치
        const xAxisY = canvas.height - 50; // x-axis y 위치

        ctx.beginPath();
        ctx.moveTo(xAxisStartX, xAxisY);
        ctx.lineTo(xAxisEndX, xAxisY);
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = "#ffffff";
        ctx.stroke();

        // x축 라벨 그리기
        const labelSpacing = (xAxisEndX - xAxisStartX) / (xAxisLabels.length - 1);
        xAxisLabels.forEach((label, index) => {
          const x = xAxisStartX + labelSpacing * index;
          ctx.fillText(label, x - 20, xAxisY + 20);
        });
      };
      // 초기 yAxis draw
      const drawYAxis = () => {
        const yAxisStartY = 50; // y-axis 시작 위치
        const yAxisEndY = canvas.height - 50; // y-axis 끝 위치
        const yAxisX = 50; // y-axis x 위치

        ctx.beginPath();
        ctx.moveTo(yAxisX, yAxisStartY);
        ctx.lineTo(yAxisX, yAxisEndY);
        ctx.strokeStyle = "#ffffff";
        ctx.lineJoin = "round";
        ctx.stroke();

        // y축 라벨 그리기
        const yAxis = makeYAxis();

        const labelSpacing = (yAxisEndY - yAxisStartY) / (yAxis.length - 1);
        yAxis.forEach((value, index) => {
          const y = yAxisEndY - labelSpacing * index;
          ctx.fillText(value.toString(), yAxisX - 30, y);
        });
      };

      drawXAxis();
      drawYAxis();

      // X축 정보
      const xPadding = 50; // X축 여백
      const xStart = xPadding; // X축 시작 위치
      const xEnd = canvas.width - xPadding; // X축 끝 위치
      const xRange = xEnd - xStart; // X축 범위
      const xStep = xRange / (xAxisLabels.length - 1); // X축 간격

      // Y축 정보
      const yPadding = 50; // Y축 여백
      const yStart = canvas.height - yPadding; // Y축 시작 위치
      const yEnd = yPadding; // Y축 끝 위치
      const yRange = yStart - yEnd; // Y축 범위
      const yStep = yRange / (Math.max(...datasets[0].data) - Math.min(...datasets[0].data)); // Y축 간격

      ctx.beginPath();
      ctx.moveTo(xStart, yStart);
      for (let i = 0; i < xAxisLabels.length; i++) {
        let x = xStart + i * xStep; // X 좌표 계산
        let y = yStart - (datasets[0].data[i] - Math.min(...datasets[0].data)) * yStep; // Y 좌표 계산
        ctx.lineTo(x, y); // 점에 연결
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ffffff";
        ctx.fillText(datasets[0].data[i], x - 5, y - 10); // 데이터 값 텍스트 표시
        ctx.lineJoin = "round";
        ctx.stroke(); // 선 그리기

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
    }
  };
  useEffect(() => {
    draw();
  }, []);

  return (
    <div className="canvas-chart-wrap-box">
      <div className="canvas-chart-content-wrap">
        <div id="top-box" className="top-box">
          <h2>Custom Canvas</h2>
          <canvas id="custom-chart"></canvas>
        </div>
        <hr />
        <div className="bottom-box">
          <h2>Chart.js</h2>
          <CustomChart className="chartjs-box" labels={cLabels} valueList={cValueList}></CustomChart>
        </div>
      </div>
    </div>
  );
};

export default CanvasChart;
