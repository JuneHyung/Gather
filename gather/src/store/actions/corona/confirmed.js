import axios from 'axios';
import { CLEAR_CONFIRMED_LIST, FETCH_CONFIRMED_LIST, FETCH_CONFIRMED_TOTAL, FETCH_LAST_UPDATEED_TIME, SET_CHART_DATA } from "../../constant/corona/variable";
import dayjs from 'dayjs';


const parseXML = async (xmlData) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
  const itemList = xmlDoc.getElementsByTagName('item');
  const result = []; // 리턴할 결과값

  for(let i=0;i<itemList.length;i++){ // itemList를 돌면서 파싱
    const tmp = {};
    const el = itemList[i];
    if(el){
      const childNodes = el.childNodes;
      for(let j=0;j<childNodes.length;j++){
        const childNode = childNodes[j];
        if (childNode.nodeType === Node.ELEMENT_NODE) {
          const tagName = childNode.tagName;
          const textContent = childNode.textContent.trim();
          tmp[tagName] = textContent;
        }
      }
    }
    result.push(tmp);
  }
  if(result.length!==0) result.sort((a,b)=>b.defCnt - a.defCnt);
  return result;
}

export const getConfirmedCountry = () =>{
  return async (dispatch, getState) => {
    const url = process.env.REACT_APP_CORONA_API_URL;
    const apiKey = process.env.REACT_APP_CORONA_API_KEY;
    try{
      const curHour = dayjs().hour();
      const std_day = curHour >12 ? dayjs().format('YYYY-MM-DD') : dayjs().subtract(1, 'd').format('YYYY-MM-DD')
      const {data} = await axios.get(url,{
        params:{
          serviceKey: apiKey,
          // std_day: dayjs().format('YYYY-MM-DD')
          std_day
        }
      });
      
      const parsedData = await parseXML(data);
      
      if(parsedData.length!==0){
        const totalItem = parsedData.filter(el=>el.gubun==='합계')[0];
        const totalItemIdx = parsedData.indexOf(totalItem);
        parsedData.splice(totalItemIdx, 1);
        
        dispatch(fetchConfirmList(parsedData));
        dispatch(fetchConfirmedTotal(totalItem.defCnt))
        dispatch(fetchLastUpdatedTime(dayjs().format('YYYY-MM-DD h:mm A')))
      }
    }catch(e){
      console.log(e);
      dispatch(clearConfirmedList())
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

const fetchConfirmedTotal = (data) =>{
  return {
    type: FETCH_CONFIRMED_TOTAL,
    data,
  }
}
const fetchLastUpdatedTime = (data) =>{
  return {
    type: FETCH_LAST_UPDATEED_TIME,
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