import axios from 'axios';
import { CLEAR_DEATH_LIST, FETCH_DEATH_LIST, FETCH_DEATH_TOTAL} from "../../constant/corona/variable";
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

export const getDeathList = (gubun) =>{
  return async (dispatch, getState) => {
    const url = process.env.REACT_APP_CORONA_API_URL;
    const apiKey = process.env.REACT_APP_CORONA_API_KEY;
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
      
      dispatch(fetchDeathList(parsedData));
      dispatch(fetchDeathTotal(parsedData[0].defCnt));
      // dispatch(fetchDeathTotal(totalItem.defCnt))
      // dispatch(fetchLastUpdatedTime(dayjs().format('YYYY-MM-DD h:mm A')))
    }catch(e){
      console.log(e);
      dispatch(clearDeathList())
    }
  }
}


const clearDeathList = () => {
  return {
    type: CLEAR_DEATH_LIST,
  }
}

const fetchDeathList = (data) =>{
  console.log(data)
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