import { useCallback, useEffect, useState } from "react";
import { getCharacterAbility } from "../../api/maple/maple";
import { divideGrade } from "../../api/maple/util";

const AbilityInfo = ({ocid}) => {
  const [abilityInfo, setAbilityInfo] = useState([]);
  
    const getAbilityInfo = useCallback(async (targetOcid)=>{
      try{
        const info = await getCharacterAbility(targetOcid);
        setAbilityInfo(info.ability_info)
      }catch(e){
        setAbilityInfo([]);
        const {error} = e.response.data;
        alert(error.message);
      }
    },[])
    useEffect(()=>{
      getAbilityInfo(ocid);
    },[getAbilityInfo, ocid])
  return (
    <ul className="ability-info-list">
      <h1>어빌리티</h1>
      <ul className="ability-info-content">
      {
        abilityInfo.map((ability)=>
          <li 
          key={`${ability.ability_no}`}
          className={`ability-info-item ${ divideGrade(ability.ability_grade)}`}
          >[ {ability.ability_grade} ] {ability.ability_value}</li>
        )
      }
      </ul>
    </ul>
  )
}

export default AbilityInfo;