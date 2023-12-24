const BasicInfo = ({basicInfo}) => {
  return (
    <div className="basic-info-list">
      <h1>기본 정보</h1>
      <div>닉네임 : {basicInfo.character_name} ({basicInfo.character_gender==='여' ? '♀' : '♂' })</div>
      <div><img src={basicInfo.character_image} alt="chracter_image"/></div>
      <div>조회시간 : {basicInfo.date}</div>
      <div>월드 : {basicInfo.world_name}</div>
      <div>레벨 : Lv. {basicInfo.character_level}</div>
      <div>직업 : {basicInfo.character_class} ( {basicInfo.character_class_level}차 )</div>
      <div>현재 경험치 : {basicInfo.character_exp_rate}% ({basicInfo.character_exp})</div>
      <div>길드 : {basicInfo.guild}</div>
    </div>
  )
}
export default BasicInfo;