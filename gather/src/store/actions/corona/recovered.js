import axios from 'axios';
import { CLEAR_RECOVERED_LIST, FETCH_RECOVERED_LIST, FETCH_RECOVERED_SPINNER, FETCH_RECOVERED_TOTAL } from "../../constant/corona/variable";
// import dayjs from 'dayjs';


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
  return result
}

export const getRecoveredList = (gubun) =>{
  return async (dispatch, getState) => {
    const url = process.env.REACT_APP_CORONA_API_URL;
    const apiKey = process.env.REACT_APP_CORONA_API_KEY;
    dispatch(fetchRecoveredSpinner(true))
    try{
      const {data} = await axios.get(url,{
        params:{
          serviceKey: apiKey,
          gubun: gubun,
          numOfRows:10
        }
      });
      const parsedData = await parseXML(data);

      // const totalItem = parsedData.filter(el=>el.gubun==='합계')[0];
      // const totalItemIdx = parsedData.indexOf(totalItem);
      // parsedData.splice(totalItemIdx, 1);
      
      dispatch(fetchRecoveredList(parsedData));
      dispatch(fetchRecoveredTotal(parsedData[0].isolClearCnt));
      // dispatch(fetchRecoveredTotal(totalItem.defCnt))
      // dispatch(fetchLastUpdatedTime(dayjs().format('YYYY-MM-DD h:mm A')))
    }catch(e){
      console.log(e);
      dispatch(clearRecoveredList())
    }finally{
      dispatch(fetchRecoveredSpinner(false))
    }
  }
}


const clearRecoveredList = () => {
  return {
    type: CLEAR_RECOVERED_LIST,
  }
}

const fetchRecoveredList = (data) =>{
  return {
    type: FETCH_RECOVERED_LIST,
    data,
  }
}

const fetchRecoveredTotal = (data) =>{
  return {
    type: FETCH_RECOVERED_TOTAL,
    data,
  }
}

const fetchRecoveredSpinner = (data) =>{
  return {
    type: FETCH_RECOVERED_SPINNER,
    data,
  }
}