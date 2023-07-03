import { useEffect, useRef } from "react";

const SpotChart = ({ data }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const chartData = data;

  const draw = () => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    canvas.width = container.clientWidth; // 캔버스 너비
    canvas.height = container.clientHeight; // 캔버스 높이

    const gap = 50;
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      const datasets = chartData.datasets;

      const makeXAxis = () => {
        const result = chartData.labels;
        return result;
      };

      // 최소 최대수를 가지고 yAxis에 표시될 배열 만들기
      const makeYAxis = () => {
        const allChartData = new Set(datasets.map((el) => el.data).flat(Infinity));
        const maxD = Math.max(...allChartData);
        const minD = Math.min(...allChartData);

        const start = minD < 0 ? minD - (10 + (minD % 10)) : minD > 0 ? 0 : minD - (minD % 10);
        const end = maxD - (maxD % 10) + 10;
        const len = chartData.step === undefined || chartData.step < 3 ? 3 : chartData.step;

        const step = Math.floor((Math.abs(end) + Math.abs(start)) / (len - 1)) + (5 - (Math.floor((Math.abs(end) + Math.abs(start)) / (len - 1)) % 5));
        const arr = Array.from({ length: len }, (_, i) => start + i * step);
        canvas.height = len * gap;
        return arr;
      };

      const xAxis = makeXAxis();
      const yAxis = makeYAxis();
      let xGap = 50;
      let yGap = 50;

      // 배경 XLine (상=>하)
      const drawXLines = (ctx, startX, endX, Y) => {
        ctx.beginPath();
        ctx.moveTo(startX, Y);
        ctx.lineTo(endX, Y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FFFFFF";
        // ctx.fillStyle = "#FFFFFF";
        ctx.stroke();
      };

      // 배경 YLine (좌->우)
      const drawYLines = (ctx, startY, endY, X) => {
        ctx.beginPath();
        ctx.moveTo(X, startY);
        ctx.lineTo(X, endY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FFFFFF";
        // ctx.fillStyle = "#FFFFFF";
        ctx.stroke();
      };

      // xLabels 구하기
      const drawXLabels = (ctx, startX, endX, Y) => {
        xGap = (endX - startX) / (xAxis.length - 1);
        xAxis.forEach((label, index) => {
          const x = startX + xGap * index;
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "0.8rem malgaun gothic";
          const fontLen = label.length * 4;
          ctx.fillText(label, x - fontLen, Y + 20);
        });
      };

      // yLabels 구하기
      const drawYLabels = (ctx, startY, endY, X) => {
        yGap = (endY - startY) / (yAxis.length - 1);
        yAxis.forEach((value, index) => {
          const y = endY - yGap * index;
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "0.8rem malgaun gothic";
          ctx.fillText(value.toString(), X - 30, y);
        });
      };

      // 배경그리기
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

        drawXLines(ctx, xAxisStartX, xAxisEndX, xAxisY);
        drawYLines(ctx, yAxisStartY, yAxisEndY, yAxisX);
        // for (let i = 0; i < xlen; i++) {
        //   drawXLines(ctx, xAxisStartX, xAxisEndX, xAxisY);
        //   xAxisY -= yGap;
        // }
        // for (let i = 0; i < ylen; i++) {
        //   drawYLines(ctx, yAxisStartY, yAxisEndY, yAxisX);
        //   yAxisX += xGap;
        // }
      };

      drawAxis();
      // ------------------------------------------------------------------------------------------
      const drawDataLine = (idx) => {
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

        ctx.moveTo(xStart, yStart); // 시작점
        ctx.beginPath(); // line 시작
        for (let i = 0; i < xAxis.length; i++) {
          let x = xStart + i * xGap; // X 좌표 계산
          let y = yStart - (datasets[idx].data[i] - Math.min(...yAxis)) * yStep; // Y 좌표 계산

          // 점위에 글자
          ctx.font = "0.8rem malgaun gothic";
          ctx.fillStyle = "#fff";
          const fontLen = datasets[0].data[i].toString().length * 4;
          ctx.fillText(datasets[idx].data[i], x - fontLen, y - 10); // 데이터 값 텍스트 표시

          // 꺾이는 부분 점.
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = datasets[idx].backgroundColor;
          ctx.fill();
        }
      };

      for (let i = 0; i < datasets.length; i++) {
        drawDataLine(i);
      }
    }
  };
  useEffect(() => {
    draw();
  }, []);

  return (
    <div ref={containerRef} id="container-box" className="top-box">
      <h2>Spot Canvas Chart</h2>
      <canvas ref={canvasRef} id="custom-chart"></canvas>
    </div>
  );
};

export default SpotChart;
