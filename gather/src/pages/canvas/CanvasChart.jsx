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
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const draw = () => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    canvas.width = container.clientWidth; // 캔버스 너비
    canvas.height = container.clientHeight; // 캔버스 높이

    const gap = 50;
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      // const xAxisLabels = chartData.labels;
      const datasets = chartData.datasets;

      const makeXAxis = () => {
        const result = chartData.labels;
        return result;
      };

      // 최소 최대수를 가지고 yAxis에 표시될 배열 만들기
      const makeYAxis = () => {
        // const datasets = chartData.datasets;
        const minD = Math.min(...datasets[0].data);
        const maxD = Math.max(...datasets[0].data);
        const step = 5;
        const start = minD - (minD % 5);
        const end = maxD - (maxD % 5) + step;
        const len = Math.ceil((end - start) / 5) + 1;

        const arr = Array.from({ length: len }, (_, i) => start + i * step);
        canvas.height = len * gap;
        return arr;
      };

      const xAxis = makeXAxis();
      const yAxis = makeYAxis();
      let xGap = 50;
      let yGap = 50;

      const drawXLines = (ctx, startX, endX, Y) => {
        ctx.beginPath();
        ctx.moveTo(startX, Y);
        ctx.lineTo(endX, Y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FFFFFF";
        // ctx.fillStyle = "#FFFFFF";
        ctx.stroke();
      };

      const drawYLines = (ctx, startY, endY, X) => {
        ctx.beginPath();
        ctx.moveTo(X, startY);
        ctx.lineTo(X, endY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FFFFFF";
        // ctx.fillStyle = "#FFFFFF";
        ctx.stroke();
      };

      const drawXLabels = (ctx, startX, endX, Y) => {
        xGap = (endX - startX) / (xAxis.length - 1);
        xAxis.forEach((label, index) => {
          const x = startX + xGap * index;
          ctx.fillStyle = "#FFFFFF";
          ctx.font="0.8rem malgaun gothic";
          const fontLen = label.length *4
          ctx.fillText(label, x - fontLen, Y + 20);
        });
      };

      const drawYLabels = (ctx, startY, endY, X) => {
        yGap = (endY - startY) / (yAxis.length - 1);
        yAxis.forEach((value, index) => {
          const y = endY - yGap * index;
          ctx.fillStyle = "#FFFFFF";
          ctx.font="0.8rem malgaun gothic";
          ctx.fillText(value.toString(), X - 30, y);
        });
      };

      const drawAxis = () => {
        const xAxisStartX = 50; // x-axis 시작
        const xAxisEndX = canvas.width - gap; // x-axis 끝
        let xAxisY = canvas.height - yGap; // 시작점Y
        const xlen = yAxis.length; // 그릴 LINE 갯수
        drawXLabels(ctx, xAxisStartX, xAxisEndX, xAxisY);

        const yAxisStartY = 50; // y-axis 시작
        const yAxisEndY = canvas.height - gap; // y-axis 끝
        let yAxisX = 50; // y-axis x 위치
        const ylen = xAxis.length;
        drawYLabels(ctx, yAxisStartY, yAxisEndY, yAxisX);

        for (let i = 0; i < xlen; i++) {
          drawXLines(ctx, xAxisStartX, xAxisEndX, xAxisY);
          xAxisY -= yGap;
        }
        for (let i = 0; i < ylen; i++) {
          drawYLines(ctx, yAxisStartY, yAxisEndY, yAxisX);
          yAxisX += xGap;
        }
      };

      drawAxis();

      const drawDataLine = () => {
        // x축 정보
        const xStart = 50; // X축 시작 위치
        // const xEnd = canvas.width - gap; // X축 끝 위치
        // const xRange = xEnd - xStart; // X축 범위
        // const xStep = xRange / (xAxis.length - 1); // X축 간격

        // y축정보
        const yStart = canvas.height - gap; // Y축 시작 위치
        const yEnd = 50; // Y축 끝 위치
        const yRange = yStart - yEnd; // Y축 범위
        const yStep = yRange / (Math.max(...yAxis) - Math.min(...yAxis)); // Y축 간격

        ctx.moveTo(xStart, yStart);
        ctx.beginPath();
        for (let i = 0; i < xAxis.length; i++) {
          let x = xStart + i * xGap; // X 좌표 계산
          let y = yStart - (datasets[0].data[i] - Math.min(...yAxis)) * yStep; // Y 좌표 계산
          ctx.lineTo(x, y); // 점에 연결
          ctx.lineWidth = 3;
          ctx.strokeStyle = "rgb(255, 99, 132)";
          ctx.fillStyle = "#fff";
          ctx.font="0.8rem malgaun gothic"
          const fontLen = datasets[0].data[i].toString().length*4;
          ctx.fillText(datasets[0].data[i], x-fontLen, y - 10); // 데이터 값 텍스트 표시
          ctx.lineJoin = "round";
          ctx.stroke(); // 선 그리기

          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "rgb(255, 99, 132)";
          ctx.fill();
        }
      };

      drawDataLine();
    }
  };
  useEffect(() => {
    draw();
  }, []);

  return (
    <div className="canvas-chart-wrap-box">
      <div className="canvas-chart-content-wrap">
        <div ref={containerRef} id="container-box" className="top-box">
          <h2>Custom Canvas</h2>
          <canvas ref={canvasRef} id="custom-chart"></canvas>
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
