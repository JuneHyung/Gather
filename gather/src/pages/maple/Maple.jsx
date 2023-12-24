import { useCallback, useState } from "react";
import { getCharacterAbility, getCharacterBasic, getCharacterHyperStat, getCharacterOCID, getCharacterStat, getCharacterUnion, getCharacterUnionRaider } from "../../api/maple/maple";
import BasicInfo from "./BasicInfo";
import StatInfo from "./StatInfo";
import HyperStatInfo from "./HyperStatinfo";
import UnionInfo from "./UnionInfo";

const Maple = () => {
  const [characterName, setCharacterName] = useState('');
  const [ocid, setOcid] = useState('')
  const [basicInfo, setBasicInfo] = useState({});
  const [abilityInfo, setAbilityInfo] = useState([]);
  const [statInfo, setStatInfo] = useState([]);
  const [hyperStatInfo, setHyperStatInfo] = useState({});
  const [unionInfo, setUnionInfo] = useState({});
  const [unionRaiderInfo, setUnionRaiderInfo] = useState({});

  const handleOnChange = useCallback((e) => {
    const { value } = e.target;
    setCharacterName(value);
  },[])

  const getBasicInfo = useCallback(async (targetOcid) => {
    try{
      const info = await getCharacterBasic(targetOcid);
      // console.log(info)
      setBasicInfo(info)
    }catch(e){
      setBasicInfo({});
      const {error} = e.response.data;
      alert(error.message);
    }
  },[])

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

  const handleOnClick = useCallback(async ()=>{
    try{
      const {ocid} = await getCharacterOCID(characterName);
      // console.log(ocid)
      if(ocid){
        setOcid(ocid);
        await getBasicInfo(ocid);
        await getAbilityInfo(ocid);
        await getStatInfo(ocid);
        await getHyperStatInfo(ocid)
        await getUnionInfo(ocid);
        await getUnionRaiderInfo(ocid)
      }else{
        setOcid('');
        setBasicInfo({});
      }
    }catch(e){
      setOcid('');
      setBasicInfo({});
      setStatInfo([]);
      setHyperStatInfo({});
      const {error} = e.response.data;
      alert(error.message);
    }
  }, [characterName, getBasicInfo, getStatInfo, getHyperStatInfo, getUnionInfo, getUnionRaiderInfo, getAbilityInfo ])
  return (
    <div className="maple-page">
      <div className="maple-search-bar">
        <input type="text" onChange={handleOnChange} className="maple-search-input"/>
        <button onClick={handleOnClick} className="maple-search-button"> Search </button>
      </div>
      <div className="maple-info-box">
      {
        ocid.length===0 ? <div>No Data</div> 
        : 
        <>
          <BasicInfo basicInfo={basicInfo}/>
          <hr />
          <StatInfo abilityInfo={abilityInfo} statInfo={statInfo} />
          <hr />
          <HyperStatInfo hyperStatInfo={hyperStatInfo} />
          <hr />
          <UnionInfo unionInfo={unionInfo} unionRaiderInfo={unionRaiderInfo} />
        </>
      }
      </div>
    </div>
  )
}

export default Maple;