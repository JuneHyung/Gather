export const CODE = {
  MINE: -7, // 지뢰
  NORMAL: -1, // 빈 칸
  QUESTION: -2, // 물음표
  FLAG: -3, // 깃발
  QUESTION_MINE: -4, // 지뢰인데 물음표
  FLAG_MINE: -5, // 지뢰인데 깃발
  CLICKED_MINE: -6, // 클릭했는데 지뢰
  OPENED: 0, // 0이상이면 OPENED
};

export const START_GAME = "START_GAME";
export const STOP_GAME = "STOP_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";
export const MINE_CELL = "MINE_CELL";

export const getTdClass = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return 'normal-cell';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return 'question-cell';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return 'flag-cell';
    case CODE.OPENED:
      return 'opened-cell';
    default:
      return;
  }
}

export const getTdText = (code) => {
  switch (code) {
    case CODE.MINE:
      return '💥';
      // return '';
    case CODE.NORMAL:
      return '';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '❓';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '🚩';
    case CODE.CLICKED_MINE:
      return '💥';
    default:
      return code || '';
  }
};

export const plantMine = (row, cell, mine) =>{
  const candidate = Array(row*cell).fill().map((arr,i)=>{
    return i;
  });
  const shuffle = [];
  while(candidate.length > row*cell - mine){
    const choosen = candidate.splice(Math.floor(Math.random()*candidate.length), 1)[0];
    shuffle.push(choosen);
  }

  const data = [];
  for(let i=0;i<row;i++){
    const rowData = [];
    data.push(rowData);
    for(let j=0;j<cell;j++){
      rowData.push(CODE.NORMAL);
    }
  }

  for(let k=0;k<shuffle.length;k++){ // 지뢰 심기
    const ver = Math.floor(shuffle[k]/cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  return data;
}
