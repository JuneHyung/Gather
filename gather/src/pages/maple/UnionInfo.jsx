import { useCallback, useEffect, useState } from "react";
import {
  getCharacterUnion,
  getCharacterUnionRaider,
} from "../../api/maple/maple";
import { divideCharacterType } from "../../api/maple/util";
import UnionTable from "./UnionTable";

const UnionInfo = ({ ocid }) => {
  const [unionInfo, setUnionInfo] = useState({});
  const [unionRaiderInfo, setUnionRaiderInfo] = useState({});
  const getUnionInfo = useCallback(async (targetOcid) => {
    try {
      const info = await getCharacterUnion(targetOcid);
      setUnionInfo(info);
    } catch (e) {
      setUnionInfo({});
      const { error } = e.response.data;
      alert(error.message);
    }
  }, []);

  const getUnionRaiderInfo = useCallback(async (targetOcid) => {
    try {
      const info = await getCharacterUnionRaider(targetOcid);
      setUnionRaiderInfo(info);
    } catch (e) {
      setUnionRaiderInfo({});
      const { error } = e.response.data;
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    getUnionInfo(ocid);
    getUnionRaiderInfo(ocid);
  }, [getUnionInfo, getUnionRaiderInfo, ocid]);

  return (
    <>
      <div className="union-info-list">
        <h1>유니온</h1>

        <ul className="union-info-content">
          {unionInfo.hasOwnProperty("union_level") ? (
            <>
              <li className="union-info-item">
                <span className="union-info-name">유니온 레벨 </span>{" "}
                <span className="union-info-value">
                  {unionInfo.union_level}{" "}
                </span>
              </li>
              <li className="union-info-item">
                <span className="union-info-name"> 유니온 등급 </span>{" "}
                <span className="union-info-value">
                  {unionInfo.union_grade}
                </span>
              </li>
            </>
          ) : (
            <li>없음</li>
          )}

          <div className="union-table-wrap">
            <UnionTable info={unionRaiderInfo} />
          </div>
        </ul>
      </div>

      <div className="union-info-list">
        <h1 className="union-info-name">유니온 Member</h1>
        <ul className="union-info-content">
          {unionRaiderInfo.hasOwnProperty("union_block") &&
          unionRaiderInfo.union_block.length > 0 ? (
            unionRaiderInfo.union_block
              .sort((a, b) => (a.block_type > b.block_type ? 1 : -1))
              .map((info, idx) => (
                <li
                  key={`${info.block_type}${info.block_class}${info.block_level}${idx}`}
                  className="union-info-item"
                >
                  
                    <span
                      className={`union-block-type ${divideCharacterType(
                        info.block_type
                      )}`}
                    >
                      [{info.block_type}]
                    </span>
                    <span className="union-block-class">
                      {info.block_class}
                    </span>
                    <span className="union-block-level">Lv.{info.block_level}</span>
                </li>
              ))
          ) : (
            <li> 없음 </li>
          )}
        </ul>
      </div>

      <div className="union-info-list">
        <h1 className="union-info-name">유니온 공격대원 효과</h1>
        <ul className="union-info-content">
          {unionRaiderInfo.hasOwnProperty("union_raider_stat") ? (
            unionRaiderInfo.union_raider_stat
              .sort()
              .reverse()
              .map((info, idx) => (
                <p
                  key={`${info}${idx}`}
                  className="union-info-item union-info-value"
                >
                  {info}
                </p>
              ))
          ) : (
            <li> 없음 </li>
          )}
        </ul>
      </div>
      <div className="union-info-list">
        <h1 className="union-info-name">유니온 공격대 점령 효과</h1>
        <ul className="union-info-content">
          {unionRaiderInfo.hasOwnProperty("union_occupied_stat") ? (
            unionRaiderInfo.union_occupied_stat
              .sort()
              .reverse()
              .map((info, idx) => (
                <li
                  key={`${info}${idx}`}
                  className="union-info-item union-info-value"
                >
                  {info}
                </li>
              ))
          ) : (
            <li> 없음 </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default UnionInfo;
