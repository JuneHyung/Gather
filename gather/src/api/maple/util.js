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