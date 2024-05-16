import { useEffect, useRef } from "react";

const SvgLineChart = ({ data }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const chartData = data;
  const width = 800,
    height = 400;
  const padding = { left: 0, right: 500, top: 0, bottom: 300 };

  const setAxiosLineAttributes = (element, attributes) => {
    const svg = svgRef.current;
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    svg.appendChild(element);
  };

  useEffect(() => {
    if (!svgRef.current || !chartData || !containerRef.current) return;

    const svg = svgRef.current;
    const { labels, step, datasets } = chartData;
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    const gap = 50;
    // X축 그리기
    const xAxios = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const xAxiosAttributes = {
      x1: gap,
      y1: height - gap,
      x2: width - gap,
      y2: height - gap,
      stroke: "#fff",
      strokeWidth: 2,
    };
    setAttributes(xAxios, xAxiosAttributes);
    svg.appendChild(xAxios);

    // Y축 그리기
    const yAxios = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const yAxiosAttributes = {
      x1: gap,
      y1: gap,
      x2: gap,
      y2: height - gap,
      stroke: "#fff",
      strokeWidth: 2,
    };
    setAttributes(yAxios, yAxiosAttributes);
    svg.appendChild(yAxios);

    // X축 레이블 표시
    const xLabelStep = (width - 100) / (labels.length - 1);
    labels.forEach((label, index) => {
      const x = gap + index * xLabelStep;
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      const textAttributes = {
        x,
        y: height - 30,
        fill: "#fff",
        "text-anchor": "middle",
      };
      setAttributes(text, textAttributes);
      text.textContent = label;
      svg.appendChild(text);
    });

    // 데이터셋 별 라인 차트 그리기
    datasets.forEach((dataset) => {
      const points = dataset.data
        .map((value, index) => {
          const x = gap + index * xLabelStep;
          const y = height - gap - (value / getMaxValue(datasets)) * (height - 100);
          return `${x},${y}`;
        })
        .join(" ");

      const line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      const lineAttributes = {
        points,
        fill: "none",
        stroke: dataset.borderColor,
        strokeWidth: dataset.borderWidth,
      };
      setAttributes(line, lineAttributes);
      svg.appendChild(line);
    });
  }, [chartData]);

  // 속성 설정 함수
  function setAttributes(element, attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttributeNS(null, key, value);
    });
  }

  // 데이터셋 중 최대값 구하기
  function getMaxValue(datasets) {
    const allValues = datasets.flatMap((dataset) => dataset.data);
    return Math.max(...allValues);
  }

  return (
    <div ref={containerRef} id="container-box" className="top-box">
      <h2>Svg Chart</h2>
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="svg-chart" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
  );
};

export default SvgLineChart;
