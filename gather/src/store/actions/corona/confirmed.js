import axios from 'axios';
import { CLEAR_CONFIRMED_LIST, FETCH_CONFIRMED_LIST, FETCH_CONFIRMED_TOTAL, SET_CHART_DATA } from "../../constant/corona/variable";


export const getConfirmedCountry = () =>{
  console.log('d?')
  return (dispatch, getState) => {
    
    // const url = `https://api.covid19api.com/country/${countryName}/status/${status}`;
    const url = `https://api.covid19api.com/summary`;
    const {data} = axios.get(url);
    
    console.log('getConfirmed')
    console.log(data);
    try{
      fetchConfirmList(data);
      // fetchConfirmTotal(data);
    }catch(e){
      console.log(e);
      dispatch(clearConfirmedList)
    }
  }
}


const clearConfirmedList = () => {
  return {
    type: CLEAR_CONFIRMED_LIST,
  }
}

const fetchConfirmList = (data) =>{
  return {
    type: FETCH_CONFIRMED_LIST,
    data,
  }
}

const fetchConfirmTotal = (data) =>{
  return {
    type: FETCH_CONFIRMED_TOTAL,
    data,
  }
}

// const setChartData = (data) => {
//   return {
//     type: SET_CHART_DATA,
//     data,
//   }
// }


// module.exports= {
//   getConfirmedCountry,
// }