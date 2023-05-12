import { memo, useCallback, useContext, useState } from "react";
import { TableContext } from "../../pages/searchMine/SearchMine";
import { MANY_MINE, NO_LESS_ZERO, START_GAME, STOP_GAME } from "../../api/searchMine/constant";

const Form = memo(() => {
  const [level, setLevel] = useState("begin");
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const [disabled, setDisabled] = useState(true);

  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    const value = e.target.value < 3 ? 3 : e.target.value > 50 ? 50 : e.target.value;
    setRow(value);
  }, []);
  const onChangeCell = useCallback((e) => {
    const value = e.target.value < 3 ? 3 : e.target.value > 50 ? 50 : e.target.value;
    setCell(value);
  }, []);
  const onChangeMine = useCallback((e) => {
    const value = e.target.value >= row * cell ? row * cell - 1 : e.target.value;
    setMine(value);
  }, [row, cell]);

  const onClickBtn = useCallback(() => {
    if(mine<=0 || row<3 || cell <3){
      dispatch({type: NO_LESS_ZERO});
      console.log(mine)
    }else if(row*cell < mine){
      dispatch({type: MANY_MINE});
    }else{
      dispatch({ type: START_GAME, row, cell, mine });
    }
  }, [row, cell, mine]);

  const switchLevel = useCallback((level) => {
    switch (level) {
      case "begin":
        setLevel(level);
        setRow(9);
        setCell(9);
        setMine(10);
        setDisabled(true);
        dispatch({type:STOP_GAME, row, cell, mine});
        return;
      case "intermediate":
        setLevel(level);
        setRow(16);
        setCell(16);
        setMine(40);
        setDisabled(true);
        dispatch({type:STOP_GAME, row, cell, mine});
        return;
      case "advanced":
        setLevel(level);
        setRow(16);
        setCell(30);
        setMine(40);
        setDisabled(true);
        dispatch({type:STOP_GAME, row, cell, mine});
        return;
      case "custom":
        setLevel(level);
        setRow(10);
        setCell(10);
        setMine(20);
        setDisabled(false);
        dispatch({type:STOP_GAME});
        return;
      default:
        return;
    }
  }, []);

  const levelList = [
    { level: "begin", name: "초급" },
    { level: "intermediate", name: "중급" },
    { level: "advanced", name: "고급" },
    { level: "custom", name: "커스텀" },
  ];

  return (
    <div className="form-box">
      <ul className="level-list">
        {levelList.map((item, i) => {
          return (
            <li
              key={`${item.level}${item.name}`}
              onClick={() => { switchLevel(item.level); }}
              className={level===item.level ? 'current-item level-item' : 'level-item'}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
      <div className="input-wrap-box">
        <label>
          세로
          <input type="number" placeholder="세로" value={row} disabled={disabled} onChange={onChangeRow} />
        </label>
        <label>
          가로
          <input type="number" placeholder="가로" value={cell} disabled={disabled} onChange={onChangeCell} />
        </label>
        <label>
          지뢰 수
          <input type="number" placeholder="지뢰 수" value={mine} disabled={disabled} onChange={onChangeMine} />
        </label>
        <button onClick={onClickBtn} className="start-button">
          시작
        </button>
      </div>
    </div>
  );
});

export default Form;
