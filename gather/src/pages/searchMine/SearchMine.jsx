import { createContext, useEffect, useMemo, useReducer } from "react";
import Form from "../../components/searchMine/Form";
import Table from "../../components/searchMine/Table";
import { CLICK_MINE, CODE, FLAG_CELL, INCREMENT_TIMER, MINE_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, START_GAME, STOP_GAME, plantMine } from "../../api/searchMine/SearchMine";

export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: "",
  halted: true,
  isWin: true,
  openedCount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        openedCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine),
        result: '',
        timer: 0,
        isWin: true,
        halted: false,
      };
    case STOP_GAME:
      return{
        ...state,
        data: {
          row: 0,
          cell: 0,
          mine: 0,
        },
        openedCount: 0,
        tableData: [],
        result: '',
        timer: 0,
        isWin: true,
        halted: true,
      }
    case OPEN_CELL:{
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = [];
      let openedCount = 0;
      // console.log(tableData.length, tableData[0].length);
      const checkAround = (row, cell) => {
        // console.log(row, cell);
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
          return;
        } // 상하좌우 없는칸은 안 열기
        if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
          return;
        } // 닫힌 칸만 열기
        if (checked.includes(row + '/' + cell)) {
          return;
        } else {
          checked.push(row + '/' + cell);
        } // 한 번 연칸은 무시하기
        let around = [
          tableData[row][cell - 1], tableData[row][cell + 1],
        ];
        if (tableData[row - 1]) {
          around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
        }
        if (tableData[row + 1]) {
          around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]]);
        }
        const count = around.filter(function (v) {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        }).length;
        if (count === 0) { // 주변칸 오픈
          if (row > -1) {
            const near = [];
            if (row - 1 > -1) {
              near.push([row -1, cell - 1]);
              near.push([row -1, cell]);
              near.push([row -1, cell + 1]);
            }
            near.push([row, cell - 1]);
            near.push([row, cell + 1]);
            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1]);
              near.push([row + 1, cell]);
              near.push([row + 1, cell + 1]);
            }
            near.forEach((n) => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                checkAround(n[0], n[1]);
              }
            })
          }
        }
        if (tableData[row][cell] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };
      checkAround(action.row, action.cell);
      let halted = false;
      let result = '';
      // console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount);
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { // 승리
        halted = true;
        // console.log('asdfas')
        result = `${state.timer}초만에 승리하셨습니다 😉`;
      }
      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      };}
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        result: '지뢰를 밟아 실패하였습니다! 😥',
        halted: true,
        isWin: false,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = tableData[action.row][action.cell] === CODE.MINE ? CODE.FLAG_MINE : CODE.FLAG;
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = (tableData[action.row][action.cell] === CODE.MINE) || (tableData[action.row][action.cell] === CODE.FLAG_MINE)? CODE.QUESTION_MINE : CODE.QUESTION;
      return {
        ...state,
        tableData,
      };
    }
    case MINE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.MINE;
      return {
        ...state,
        tableData
      }
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = tableData[action.row][action.cell] === CODE.QUESTION_MINE ? CODE.MINE : CODE.NORMAL;

      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }
    default:
      return state;
  }
};

const SearchMine = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, timer, result, halted, isWin } = state;
  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);
  useEffect(() => {
    let timer;
    if (halted===false) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [halted]);

  return (
    <TableContext.Provider value={value}>
      <h1 className="search-mine-title">지뢰찾기</h1>
      <Form halted={halted}/>
      <p className="timer-text">경과 시간 {timer} 초</p>
      <p className={ !isWin ? 'fail-result-message result-message' : 'win-result-message result-message'}>{result}</p>
      <Table></Table>
    </TableContext.Provider>
  );
};

export default SearchMine;
