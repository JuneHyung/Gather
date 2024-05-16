export const divideNumberComma = (num) => {
  if(num) return Number(num).toLocaleString("ko-KR")
  return null;
}

export const divideGrade = (grade)=>{
  switch(grade){
    case '레전드리': return 'rank-legend';
    case '에픽': return 'rank-epic';
    case '유니크': return 'rank-unique';
    case '레어': return 'rank-rare';
    default: return 'rank-rare';
  }
}

export const divideCharacterType = (val) => {
  switch(val){
    case '전사' : return 'warrior-block';
    case '궁수' : return 'archer-block';
    case '마법사' : return 'wizard-block';
    case '도적' : return 'thief-block';
    case '해적' : return 'pirate-block';
    default: return 'other-block';
  }
}