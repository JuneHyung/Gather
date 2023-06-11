const { createStore, compose, applyMiddleware } = require("redux");
const reducer = require('./../../reducers/corona');
const { composeWithDevTools } = require('redux-devtools-extension');

const initialState = {
  confirmed: {
    confirmedTotal: 0,
    confirmedList: [],
    lastUpdatedTime: '',
    confirmedSpinner: false,
  },
  death: {
    deathTotal: 0,
    deathList: [],
    deathSpinner: false,
    chartData: {
      name:'',
      labels:[],
      valueList:[],
    }
  },
  recovered: {
    recoveredTotal: 0,
    recoveredSpinner: false,
    recoveredList: [],
  },
}

const firstMiddleware = (store) => (dispatch) => (action) =>{
  // console.log('로깅', action)
  // 기능 추가
  dispatch(action)
};

const thunkMiddleware = (store) => (dispatch) => (action) =>{
  if(typeof action === 'function'){
    return action(store.dispatch, store.getState);
  }
  return dispatch(action)
};


const enhancer =  process.env.NODE_ENV === 'production'
? compose(
  applyMiddleware(
    firstMiddleware,
    thunkMiddleware,
  ),
)
: composeWithDevTools(
  applyMiddleware(
    firstMiddleware,
    thunkMiddleware,
  ),
);


const store = createStore(reducer, initialState, enhancer);


module.exports = store;