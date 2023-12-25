import { useCallback, useEffect, useState } from "react";
import { getCharacterAbility, getCharacterStat } from "../../api/maple/maple";

const StatInfo = ({ocid}) => {
  const [abilityInfo, setAbilityInfo] = useState([]);
  const [statInfo, setStatInfo] = useState([]);

  const getAbilityInfo = useCallback(async (targetOcid)=>{
    try{
      const info = await getCharacterAbility(targetOcid);
      // console.log(info)
      setAbilityInfo(info.ability_info)
    }catch(e){
      setAbilityInfo([]);
      const {error} = e.response.data;
      alert(error.message);
    }
  },[])

  const getStatInfo = useCallback(async (targetOcid)=>{
    try{
      const info = await getCharacterStat(targetOcid);
      // console.log(info)
      setStatInfo(info.final_stat)
    }catch(e){
      setStatInfo([]);
      const {error} = e.response.data;
      alert(error.message);
    }
  },[])

  useEffect(()=>{
    getStatInfo(ocid);
    getAbilityInfo(ocid);
  },[getStatInfo, getAbilityInfo, ocid])

  return (
    <ul className="stat-info-list">
      <h1>어빌리티</h1>
      {
        abilityInfo.map((ability)=>
          <li key={`${ability.ability_no}`}>[ {ability.ability_grade} ] {ability.ability_value}</li>
        )
      }
      <br/>
      <h1>스탯</h1>
      {
        statInfo.sort().map((stat)=>
          <li key={`${stat.stat_name}${stat.stat_value}`}>{stat.stat_name} : {stat.stat_value}</li>
        )
      }
    </ul>
  )
}
export default StatInfo;