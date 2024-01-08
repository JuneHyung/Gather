import { useCallback, useState } from "react";
import { getCharacterOCID } from "../../api/maple/maple";
import BasicInfo from "./BasicInfo";
import StatInfo from "./StatInfo";
import HyperStatInfo from "./HyperStatinfo";
import UnionInfo from "./UnionInfo";
import AbilityInfo from "./AbilityInfo";
import EquipmentInfo from "./EquipmentInfo";

const Maple = () => {
  const [characterName, setCharacterName] = useState("이깅우");
  const [ocid, setOcid] = useState("");

  const handleOnChange = useCallback((e) => {
    const { value } = e.target;
    setCharacterName(value);
  }, []);

  const handleOnClick = useCallback(async () => {
    try {
      const { ocid } = await getCharacterOCID(characterName);
      if (ocid) {
        setOcid(ocid);
      } else {
        setOcid("");
      }
    } catch (e) {
      setOcid("");
      const { error } = e.response.data;
      alert(error.message);
    }
  }, [characterName]);

  return (
    <div className="maple-page">
      <div className="maple-search-bar">
        <input type="text" onChange={handleOnChange} className="maple-search-input" />
        <button onClick={handleOnClick} className="maple-search-button">
          Search
        </button>
      </div>
      {ocid.length===0 
        ? (<div>No Data</div>) 
        : <>
        <div className="maple-info-box">
          <>
            <div className="info-wrap">
              <BasicInfo ocid={ocid} />
              <AbilityInfo ocid={ocid} />
            </div>
            <div className="info-wrap">
              <StatInfo ocid={ocid} />
            </div>
            <div className="info-wrap">
              <EquipmentInfo ocid={ocid} />
            </div>
          </>
      </div>
            <div>
              <UnionInfo ocid={ocid} />
            </div>
        </> 
        
        }
      
    </div>
  );
};

export default Maple;
