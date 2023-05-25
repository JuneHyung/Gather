const { CLEAR_DEATH_LIST, FETCH_DEATH_LIST, FETCH_DEATH_TOTAL } = require("../../constant/corona/variable");

const initialstate = {
  deathTotal: 0,
  deathList: [],
};
const deathReducer = (prevState = initialstate, action) => {
  switch (action.type) {
    case CLEAR_DEATH_LIST:
      return { deathTotal:0, deathList: []};
    case FETCH_DEATH_LIST:
      return {...prevState, deathList: action.data};
    case FETCH_DEATH_TOTAL:
      return {...prevState, deathTotal: action.data}
    default:
      return prevState;
  }
};
module.exports = deathReducer;
