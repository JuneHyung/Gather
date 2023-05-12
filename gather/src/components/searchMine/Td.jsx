import { memo, useCallback, useContext } from "react";
import { TableContext } from "../../pages/searchMine/SearchMine";
import { getTdClass, getTdText } from "../../api/searchMine/SearchMine";
import { CODE, CLICK_MINE, FLAG_CELL, MINE_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, } from "../../api/searchMine/constant";



const Td = memo(({rowIndex, cellIndex}) =>{
  const {tableData, dispatch, halted} = useContext(TableContext);
  const onClickTd = useCallback(()=>{
    if(halted){return;}
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED: // 이미 연칸은 효과X
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL: // 보통 칸은
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
      default: return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  const onRightClickTd = useCallback((e)=>{
    e.preventDefault();
    if(halted){ return; }
    switch(tableData[rowIndex][cellIndex]){
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({type: FLAG_CELL, row: rowIndex, cell: cellIndex})
        break;
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({type: QUESTION_CELL, row: rowIndex, cell: cellIndex})
        return;
      case CODE.QUESTION:
        dispatch({type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex})
        return;
      case CODE.QUESTION_MINE:
        dispatch({type: MINE_CELL, row: rowIndex, cell: cellIndex})
        return;
      default:return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData[rowIndex][cellIndex], halted])
  return (
    <td onClick={onClickTd} onContextMenu={onRightClickTd} className={getTdClass(tableData[rowIndex][cellIndex])}>{getTdText(tableData[rowIndex][cellIndex])}</td>
  )
})
export default Td;