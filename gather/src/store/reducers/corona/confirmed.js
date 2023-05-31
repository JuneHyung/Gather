const { CLEAR_CONFIRMED_LIST, FETCH_CONFIRMED_LIST, SET_CHART_DATA, FETCH_CONFIRMED_TOTAL, FETCH_LAST_UPDATEED_TIME } = require("../../constant/corona/variable");

const initialstate = {
  confirmedTotal: 0,
  confirmedList: [],
  lastUpdatedTime: '',
}
const confirmedReducer = (prevState=initialstate, action) => {
  switch(action.type){
    case CLEAR_CONFIRMED_LIST:
      return { ...prevState, confirmedTotal:0, confirmedList: []};
    case FETCH_CONFIRMED_LIST:
      return { ...prevState, confirmedList: action.data};
    case FETCH_CONFIRMED_TOTAL:
      return {...prevState, confirmedTotal: action.data}
    case FETCH_LAST_UPDATEED_TIME:
      return {...prevState, lastUpdatedTime: action.data}
    case SET_CHART_DATA:
      return [];
    default: return prevState;
  }
}
module.exports=confirmedReducer