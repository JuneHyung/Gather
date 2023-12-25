import { useCallback, useEffect, useState } from "react";
import { getCharacterUnion, getCharacterUnionRaider } from "../../api/maple/maple";

const UnionInfo = ({ ocid }) => {
  const [unionInfo, setUnionInfo] = useState({});
  const [unionRaiderInfo, setUnionRaiderInfo] = useState({});
  const getUnionInfo = useCallback(async (targetOcid)=>{
    try{
      const info = await getCharacterUnion(targetOcid);
      setUnionInfo(info)
    }catch(e){
      setUnionInfo({});
      const {error} = e.response.data;
      alert(error.message);
    }
  }, [])

  const getUnionRaiderInfo = useCallback(async (targetOcid)=>{
    try{
      const info = await getCharacterUnionRaider(targetOcid);
      setUnionRaiderInfo(info)
    }catch(e){
      setUnionRaiderInfo({});
      const {error} = e.response.data;
      alert(error.message);
    }
  }, [])

  useEffect(()=>{
    getUnionInfo(ocid);
    getUnionRaiderInfo(ocid);
  },[getUnionInfo, getUnionRaiderInfo, ocid])
  
  return (
    <ul className="hyper-stat-info-list">
      <h1>유니온</h1>
      {
        unionInfo.hasOwnProperty("union_level") 
        ? <><li>유니온 레벨 : {unionInfo.union_level}</li>
        <li>유니온 등급 : {unionInfo.union_grade}</li></>
        : <li>없음</li>
      }
      
      {
        unionRaiderInfo.hasOwnProperty("union_raider_stat") 
        ?<li>
        유니온 공격대원 효과 :
        {unionRaiderInfo.union_raider_stat.sort().reverse().map((info, idx) => (
          <p key={`${info}${idx}`}>{info}</p>
        ))}
      </li>
      : <li> 없음 </li> 
      }
      <br/>
      {
        unionRaiderInfo.hasOwnProperty("union_occupied_stat") 
        ?<li>
        유니온 공격대 점령 효과 :
        {unionRaiderInfo.union_occupied_stat.sort().reverse().map((info, idx) => (
          <p key={`${info}${idx}`}>{info}</p>
        ))}
      </li>
      : <li> 없음 </li> 
      }
      {
        unionRaiderInfo.hasOwnProperty("union_block") && unionRaiderInfo.union_block.length>0
        ?<li>
        <p>Member</p>
        {unionRaiderInfo.union_block.map((info, idx) => (
          <p key={`${info.block_type}${info.block_class}${info.block_level}${idx}`}>[{info.block_type}] {info.block_class} Lv.{info.block_level}</p>
        ))}
      </li>
      : <li> 없음 </li> 
      }
    </ul>
  );
};
export default UnionInfo;
