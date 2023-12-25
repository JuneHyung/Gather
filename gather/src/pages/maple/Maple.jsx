import { useCallback, useState } from "react";
import { getCharacterAbility, getCharacterBasic, getCharacterHyperStat, getCharacterOCID, getCharacterStat, getCharacterUnion, getCharacterUnionRaider } from "../../api/maple/maple";
import BasicInfo from "./BasicInfo";
import StatInfo from "./StatInfo";
import HyperStatInfo from "./HyperStatinfo";
import UnionInfo from "./UnionInfo";

const Maple = () => {
  const [characterName, setCharacterName] = useState('');
  const [ocid, setOcid] = useState('')

  const handleOnChange = useCallback((e) => {
    const { value } = e.target;
    setCharacterName(value);
  },[])

  const handleOnClick = useCallback(async ()=>{
    try{
      const {ocid} = await getCharacterOCID(characterName);
      if(ocid){
        setOcid(ocid);
      }else{
        setOcid('');
      }
    }catch(e){
      setOcid('');
      const {error} = e.response.data;
      alert(error.message);
    }
  }, [characterName ])

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
          <BasicInfo ocid={ocid}/>
          <hr />
          <StatInfo  ocid={ocid} />
          <hr />
          <HyperStatInfo ocid={ocid}/>
          <hr />
          <UnionInfo ocid={ocid} />
        </>
      }
      </div>
    </div>
  )
}

export default Maple;