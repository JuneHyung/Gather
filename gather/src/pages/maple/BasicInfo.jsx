import { useCallback, useEffect, useState } from "react";
import { getCharacterBasic } from "../../api/maple/maple";
import { divideNumberComma } from "../../api/maple/util";

const BasicInfo = ({ ocid }) => {
  const [basicInfo, setBasicInfo] = useState({});
  const getBasicInfo = useCallback(async (targetOcid) => {
    try {
      const info = await getCharacterBasic(targetOcid);
      setBasicInfo(info);
    } catch (e) {
      setBasicInfo({});
      const { error } = e.response.data;
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    getBasicInfo(ocid);
  }, [getBasicInfo, ocid]);

  return (
    <div className="basic-info-list">
      <h1>기본 정보</h1>
      <div className="basic-info-content">
        <div className="basic-img-wrap">
          <div className="character-icon">
            <img src={basicInfo.character_image} alt="chracter_image" />
          </div>
          <ul className="character-description">
            <li className="character-info-item">
              {basicInfo.character_name} ({basicInfo.character_gender === "여" ? "♀" : "♂"})
            </li>
            <li className="character-info-item">{basicInfo.world_name}</li>
            <li className="character-info-item">
              {basicInfo.character_class} ( {basicInfo.character_class_level}차 )
            </li>
            <li className="character-info-item">
              Lv. {basicInfo.character_level} {basicInfo.character_exp_rate}% ({divideNumberComma(basicInfo.character_exp)})
            </li>
            <li className="character-info-item">{basicInfo.character_guild_name} 길드</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default BasicInfo;
