const StatInfo = ({statInfo, abilityInfo}) => {
  return (
    <ul className="stat-info-list">
      <h1>어빌리티</h1>
      {
        abilityInfo.map((ability)=>
          <li key={`${ability.ability_no}`}>[ {ability.ability_grade} ] {ability.ability_value}</li>
        )
      }
      <br/>
      <h1>스탯</h1>
      {
        statInfo.sort().map((stat)=>
          <li key={`${stat.stat_name}${stat.stat_value}`}>{stat.stat_name} : {stat.stat_value}</li>
        )
      }
    </ul>
  )
}
export default StatInfo;