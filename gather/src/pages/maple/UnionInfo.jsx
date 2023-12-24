const UnionInfo = ({ unionInfo, unionRaiderInfo }) => {
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
