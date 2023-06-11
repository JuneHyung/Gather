import axios from 'axios';
import { CLEAR_DEATH_LIST, FETCH_DEATH_LIST, FETCH_DEATH_SPINNER, FETCH_DEATH_TOTAL} from "../../constant/corona/variable";
import { SET_CHART_DATA } from '../../constant/corona/variable';
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

const makeChartData = (list) =>{
  const keys = list.map(el=>el.stdDay);
  const values = list.map(el=>el.deathCnt);
  
  const result = {name: list[0].gubun, labels: keys, valueList: values}
  return result;
}


export const getDeathList = (gubun) =>{
  return async (dispatch, getState) => {
    const url = process.env.REACT_APP_CORONA_API_URL;
    const apiKey = process.env.REACT_APP_CORONA_API_KEY;
    dispatch(fetchDeathSpinner(true));
    try{
      const {data} = await axios.get(url,{
        params:{
          serviceKey: apiKey,
          gubun: gubun,
          numOfRows:10
        }
      });
      const parsedData = await parseXML(data);
      dispatch(fetchDeathList(parsedData));
      dispatch(fetchDeathTotal(parsedData[0].defCnt));
      dispatch(fetchChartData(makeChartData(parsedData)));
    }catch(e){
      console.log(e);
      dispatch(clearDeathList())
    }finally{
      dispatch(fetchDeathSpinner(false));
    }
  }
}

const clearDeathList = () => {
  return {
    type: CLEAR_DEATH_LIST,
  }
}

const fetchDeathList = (data) =>{
  return {
    type: FETCH_DEATH_LIST,
    data,
  }
}

const fetchDeathTotal = (data) =>{
  return {
    type: FETCH_DEATH_TOTAL,
    data,
  }
}

const fetchChartData = (data)=>{
  return {
    type: SET_CHART_DATA,
    data,
  }
}

const fetchDeathSpinner = (data)=>{
  return {
    type: FETCH_DEATH_SPINNER,
    data,
  }
}