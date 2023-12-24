const HyperStatInfo = ({hyperStatInfo}) => {
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