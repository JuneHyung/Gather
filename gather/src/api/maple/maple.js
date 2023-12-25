import axios from "axios";
import dayjs from "dayjs";
 
// 캐const apiKey = process.env.REACT_APP_MAPLE_API_KEY;릭터 식별자 조회
const baseUrl = `https://open.api.nexon.com/maplestory/v1`
const apiKey = process.env.REACT_APP_MAPLE_API_KEY;
const baseDay = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

export const getCharacterOCID = async (character_name) => {
  const {data} = await axios.get(`${baseUrl}/id`, {
    params: {
      character_name,
    },
    headers:{
      "x-nxopen-api-key": apiKey,
      "accept": "application/json"
    }
  })
  return data;
}

// 캐릭터 기본 정보 조회
export const getCharacterBasic = async (ocid) => {
  const {data} = await axios.get(`${baseUrl}/character/basic`, {
    params:{
      ocid,
      date: baseDay
    },
    headers:{
      "x-nxopen-api-key": apiKey,
      "accept": "application/json"
    }
  })
  return data;
}
// 캐릭터 어빌리티 조회
export const getCharacterAbility = async (ocid) => {
  const {data} = await axios.get(`${baseUrl}/character/ability`, {
    params:{
      ocid,
      date: baseDay
    },
    headers:{
      "x-nxopen-api-key": apiKey,
      "accept": "application/json"
    }
  })
  return data;
}
// 캐릭터 종합 능력치 정보 조회
export const getCharacterStat = async (ocid) => {
  const {data} = await axios.get(`${baseUrl}/character/stat`, {
    params:{
      ocid,
      date: baseDay
    },
    headers:{
      "x-nxopen-api-key": apiKey,
      "accept": "application/json"
    }
  })
  return data;
}
// 캐릭터 하이퍼스탯 정보 조회
export const getCharacterHyperStat = async (ocid) => {
  const {data} = await axios.get(`${baseUrl}/character/hyper-stat`, {
    params:{
      ocid,
      date: baseDay
    },
    headers:{
      "x-nxopen-api-key": apiKey,
      "accept": "application/json"
    }
  })
  return data;
}

// 유니온 정보 조회
export const getCharacterUnion = async (ocid) => {
  const {data} = await axios.get(`${baseUrl}/user/union`, {
    params:{
      ocid,
      date: baseDay
    },
    headers:{
      "x-nxopen-api-key": apiKey,
      "accept": "application/json"
    }
  })
  return data;
}


// 유니온 공격대 정보 조회
export const getCharacterUnionRaider = async (ocid) => {
  const {data} = await axios.get(`${baseUrl}/user/union-raider`, {
    params:{
      ocid,
      date: baseDay
    },
    headers:{
      "x-nxopen-api-key": apiKey,
      "accept": "application/json"
    }
  })
  return data;
}

// 장착장비 조회
export const getChracterEquipment = async (ocid) => {
  const {data} = await axios.get(`${baseUrl}/character/item-equipment`, {
    params:{
      ocid,
      date: baseDay
    },
    headers:{
      "x-nxopen-api-key": apiKey,
      "accept": "application/json"
    }
  })
  return data;
}

