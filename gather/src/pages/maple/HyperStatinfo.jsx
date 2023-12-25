import { useCallback, useEffect, useState } from "react";
import { getCharacterHyperStat } from "../../api/maple/maple";

const HyperStatInfo = ({ocid}) => {
  const [hyperStatInfo, setHyperStatInfo] = useState({});
  const getHyperStatInfo = useCallback(async (targetOcid)=>{
    try{
      const info = await getCharacterHyperStat(targetOcid);
      const {hyper_stat_preset_1, hyper_stat_preset_1_remain_point, hyper_stat_preset_2, hyper_stat_preset_2_remain_point, hyper_stat_preset_3, hyper_stat_preset_3_remain_point } = info;
      // console.log(hyper_stat_preset_1)
      setHyperStatInfo({
        hyper_stat_preset_1, hyper_stat_preset_1_remain_point, hyper_stat_preset_2, hyper_stat_preset_2_remain_point, hyper_stat_preset_3, hyper_stat_preset_3_remain_point 
      })
    }catch(e){
      setHyperStatInfo({});
      const {error} = e.response.data;
      alert(error.message);
    }
  },[])

  useEffect(()=>{
    getHyperStatInfo(ocid)
  }, [getHyperStatInfo, ocid])
  
  return (
    <ul className="hyper-stat-info-list">
      <h1>하이퍼 스탯</h1>
      {
        hyperStatInfo.hasOwnProperty('hyper_stat_preset_1_remain_point') 
        ? <li>
        <p>남은 포인트 : {hyperStatInfo.hyper_stat_preset_1_remain_point}</p>
        {
          hyperStatInfo.hyper_stat_preset_1.map((stat, idx)=>
            <p key={`preset${idx+1}${stat.stat_type}`}>{stat.stat_type} : {stat.stat_level} / {stat.stat_level===0 ? 0 : stat.stat_increase}</p>
          )
        } 
      </li>
      :<li>없음</li>
      }
      
    </ul>
  )
}
export default HyperStatInfo;