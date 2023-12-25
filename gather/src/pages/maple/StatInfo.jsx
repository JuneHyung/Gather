import { useCallback, useEffect, useState } from "react";
import { getCharacterStat } from "../../api/maple/maple";
import { divideNumberComma } from "../../api/maple/util";

const StatInfo = ({ocid}) => {
  const [statInfo, setStatInfo] = useState([]);

  const getStatInfo = useCallback(async (targetOcid)=>{
    try{
      const info = await getCharacterStat(targetOcid);
      setStatInfo(info.final_stat)
    }catch(e){
      setStatInfo([]);
      const {error} = e.response.data;
      alert(error.message);
    }
  },[])


  useEffect(()=>{
    getStatInfo(ocid);
  },[getStatInfo, ocid])

  return (
    <div className="stat-info-list">
      <h1>스탯</h1>
      <ul className="stat-info-content">
      {
        statInfo.sort().map((stat)=>
          <li key={`${stat.stat_name}${stat.stat_value}`} className="stat-info-item">
            <span className="stat-name">{stat.stat_name} </span> <span className="stat-value"> {divideNumberComma(stat.stat_value)}</span></li>
        )
      }
      </ul>
    </div>
  )
}
export default StatInfo;