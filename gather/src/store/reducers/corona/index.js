const {combineReducers} = require('redux');
const confirmedReducer = require('./confirmed');
const deathReducer = require('./death');
const recoveredReducer = require('./recovered');

module.exports = combineReducers({
  confirmed: confirmedReducer,
  death: deathReducer,
  recovered: recoveredReducer
});