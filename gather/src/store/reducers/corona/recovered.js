const { CLEAR_RECOVERED_LIST, FETCH_RECOVERED_LIST, FETCH_RECOVERED_TOTAL } = require("../../constant/corona/variable");

const initialstate = {
  recoveredTotal: 0,
  recoveredList: [],
}
const recoveredReducer = (prevState=initialstate, action) => {
  switch(action.type){
    case CLEAR_RECOVERED_LIST:
      return {...prevState, recoveredList: []};
    case FETCH_RECOVERED_LIST:
      return {...prevState, recoveredList: action.data};
    case FETCH_RECOVERED_TOTAL:
      return {...prevState, recoveredTotal: action.data};
    default:
    return prevState;
  }
}
module.exports=recoveredReducer