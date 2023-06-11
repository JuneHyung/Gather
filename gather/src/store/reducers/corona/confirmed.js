const { CLEAR_CONFIRMED_LIST, FETCH_CONFIRMED_LIST, FETCH_CONFIRMED_TOTAL, FETCH_LAST_UPDATEED_TIME, FETCH_CONFIRMED_SPINNER } = require("../../constant/corona/variable");

const initialstate = {
  confirmedTotal: 0,
  confirmedList: [],
  lastUpdatedTime: '',
  confirmedSpinner: false,
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
    case FETCH_CONFIRMED_SPINNER:
      return {...prevState, confirmedSpinner: action.data}
    default: return prevState;
  }
}
module.exports=confirmedReducer