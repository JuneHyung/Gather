const { CLEAR_DEATH_LIST, FETCH_DEATH_LIST, FETCH_DEATH_TOTAL, SET_CHART_DATA, FETCH_DEATH_SPINNER } = require("../../constant/corona/variable");

const initialstate = {
  deathTotal: 0,
  deathList: [],
  deathSpinner: false,
  chartLabels:[],
  chartValues:[],
  chartData: {
    name:'',
    labels:[],
    valueList:[],
  }
};
const deathReducer = (prevState = initialstate, action) => {
  switch (action.type) {
    case CLEAR_DEATH_LIST:
      return { deathTotal:0, deathList: []};
    case FETCH_DEATH_LIST:
      return {...prevState, deathList: action.data};
    case FETCH_DEATH_TOTAL:
      return {...prevState, deathTotal: action.data};
    case SET_CHART_DATA:
        return {...prevState, chartData: {name: action.data.name, labels: action.data.labels, valueList: action.data.valueList}};
    case FETCH_DEATH_SPINNER:
        return {...prevState, deathSpinner: action.data};
    default:
      return prevState;
  }
};
module.exports = deathReducer;
