
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
export const MANY_MINE = "MANY_MINE";
export const NO_LESS_ZERO = "NO_LESS_ZERO";