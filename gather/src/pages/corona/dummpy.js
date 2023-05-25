import { useReducer } from "react";

const CovidStatus = {
  Confirmed: "confirmed",
  Recovered: "recovered",
  Deaths: "deaths",
};

const initialState = {
  confirmTotal: 0,
  deathTotal: 0,
  recoveredTotal: 0,
  listItem: [],
  lastUpdatedTime: "",
  selectedId: "",
  isDeathLoading: false,
};

const reducer = (state, action) => {};

const Corona = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { confirmTotal, deathTotal, recoveredTotal, listItem, lastUpdatedTime, selectedId, isDeathLoading } = state;

  const clearDeathList = () => {};
  const clearRecoveredList = () => {};
  const startLoadingAnimation = () => {};
  const endLoadingAnimation = () => {
    // deathsList.removeChild(deathSpinner);
    // recoveredList.removeChild(recoveredSpinner);
  };
  const setDeathsList = (data) => {
    // const sorted = data.sort(
    //   (a: CountrySummaryInfo, b: CountrySummaryInfo) =>
    //     getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
    // );
    // deathList sorted로 변경변경
  };
  const setRecoveredList = (data) => {
    // const sorted = data.sort(
    //   (a: CountrySummaryInfo, b: CountrySummaryInfo) =>
    //     getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
    // );
    // class 변경필요
    // recoveredList sorted로 변경변경
  };
  const setTotalDeathsByCountry = (data) => {
    // deathTotal = data[0].Cases.toString()
  };
  const setTotalRecoveredByCountry = (data) => {
    // recoveredTotal = data[0].Cases.toString();
  };

  const renderChart = (data, labels) => {
    // // const ctx = ($('#lineChart') as HTMLCanvasElement).getContext('2d');
    // const lineChart = $('#lineChart') as HTMLCanvasElement;
    // const ctx = lineChart.getContext('2d');
    // Chart.defaults.color = '#f5eaea';
    // Chart.defaults.font.family = 'Exo 2';
    // new Chart(ctx, {
    //   type: 'line',
    //   data: {
    //     labels,
    //     datasets: [
    //       {
    //         label: 'Confirmed for the last two weeks',
    //         backgroundColor: '#feb72b',
    //         borderColor: '#feb72b',
    //         data,
    //       },
    //     ],
    //   },
    //   options: {},
    // });
  };

  function fetchCountryInfo(countryName, status) {
    // status params: confirmed, recovered, deaths
    const url = `https://api.covid19api.com/country/${countryName}/status/${status}`;
    // return axios.get(url);
    return;
  }

  const setChartData = (data) => {
    const chartData = data.slice(-14).map((value) => value.Cases);
    const chartLabel = data.slice(-14).map((value) => new Date(value.Date).toLocaleDateString().slice(5, -1));
    renderChart(chartData, chartLabel);
  };

  const setLastUpdatedTimestamp = (data) =>{
    // lastUpdatedTime = new Date(data.Date).toLocaleString();
  }
  const handleListClick = async (e) => {
    // selectedId = e.target.id;
    if (isDeathLoading) {
      return;
    }
    clearDeathList();
    clearRecoveredList();
    startLoadingAnimation();
    // isDeathLoading = true;
    const { data: deathResponse } = await fetchCountryInfo(selectedId, CovidStatus.Deaths);
    const { data: recoveredResponse } = await fetchCountryInfo(selectedId, CovidStatus.Recovered);
    const { data: confirmedResponse } = await fetchCountryInfo(selectedId, CovidStatus.Confirmed);

    endLoadingAnimation();
    setDeathsList(deathResponse);
    setTotalDeathsByCountry(deathResponse);
    setRecoveredList(recoveredResponse);
    setTotalRecoveredByCountry(recoveredResponse);
    setChartData(confirmedResponse);
    // isDeathLoading = false;
  };
  return (
    <body>
      <header class="flex justify-center">
        <h1>코로나 세계 현황판</h1>
      </header>
      <main class="flex">
        <div class="left-panel flex column">
          <div class="total-board">
            <p>Total Confirmed</p>
            <span class="confirmed-total">{confirmTotal}</span>
          </div>
          <div class="country-ranks">
            <p>Confirmed Cases by Country</p>
            <ol class="rank-list" onClick={handleListClick}>
              {listItem.map((item, i) => (
                <li key={i} class="list-item flex align-center">
                  <span class="cases">{item.TotalConfirmed.toString()}</span>
                  <p class="country">{item.Country}</p>
                </li>
              ))}
            </ol>
          </div>
          <p class="last-updated-time flex justify-center align-center">{lastUpdatedTime}</p>
        </div>
        <div class="right-panel">
          <div class="summary-wrapper flex">
            <div class="deaths-container">
              <h3 class="summary-title">Total Deaths</h3>
              <p class="total deaths">{deathTotal}</p>
              <div class="list-wrapper">
                <ol class="deaths-list"></ol>
              </div>
            </div>
            <div class="recovered-container">
              <h3 class="summary-title">Total Recovered</h3>
              <p class="total recovered">{recoveredTotal}</p>
              <div class="list-wrapper">
                <ol class="recovered-list"></ol>
              </div>
            </div>
          </div>
          <div class="chart-container">
            <canvas id="lineChart" class="corona-chart"></canvas>
          </div>
        </div>
      </main>
    </body>
  );
};

export default Corona;
