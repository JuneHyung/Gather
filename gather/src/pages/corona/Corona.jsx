// import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConfirmedCountry } from "./../../store/actions/corona/confirmed";
import { useCallback } from "react";

import CoronaChart from "./CoronaChart";
import Confirmed from "./confirmed/Confirmed";
import Death from "./death/Death";
import Recovered from "./recovered/recovered";

const Corona = () => {
  const { confirmedSpinner } = useSelector((state) => state.confirmed);
  const { chartData } = useSelector((state) => state.death);
  const dispatch = useDispatch();

  const refreshConfirmedList = useCallback(() => {
    if (!confirmedSpinner) {
      dispatch(getConfirmedCountry());
    }
  }, [dispatch, confirmedSpinner]);

  return (
    <div>
      <header className="flex justify-center">
        <h1>
          코로나 한국 현황판 <span onClick={refreshConfirmedList}>새로고침</span>
        </h1>
      </header>
      <main className="flex">
        <div className="left-panel flex column">
          <Confirmed></Confirmed>
        </div>
        <div className="right-panel">
          <div className="summary-wrapper flex">
            <Death></Death>
            <Recovered></Recovered>
          </div>
          <div className="chart-container">
            <CoronaChart cityName={chartData.name} labels={chartData.labels} valueList={chartData.valueList}></CoronaChart>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Corona;
