// import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConfirmedCountry } from "./../../store/actions/corona/confirmed";
import { useCallback } from "react";
import { getDeathList } from "../../store/actions/corona/death";
import { getRecoveredList } from "../../store/actions/corona/recovered";
import CoronaChart from "./CoronaChart";

const Corona = () => {
  const { confirmedTotal, confirmedList, lastUpdatedTime, confirmedSpinner } = useSelector((state) => state.confirmed);
  const { deathTotal, deathList, chartData, deathSpinner } = useSelector((state) => state.death);
  const { recoveredTotal, recoveredList, recoveredSpinner } = useSelector((state) => state.recovered);
  const dispatch = useDispatch();

  const refreshConfirmedList = useCallback(() => {
    if (!confirmedSpinner) {
      dispatch(getConfirmedCountry());
    }
  }, [dispatch, confirmedSpinner]);

  const handleDetailItem = useCallback(
    (item) => {
      if(!deathSpinner){
        dispatch(getDeathList(item.gubun));
      }
      if(!recoveredSpinner){
        dispatch(getRecoveredList(item.gubun));
      }
    },
    [dispatch, deathSpinner, recoveredSpinner]
  );

  return (
    <div>
      <header className="flex justify-center">
        <h1>
          코로나 한국 현황판 <span onClick={refreshConfirmedList}>새로고침</span>
        </h1>
      </header>
      <main className="flex">
        <div className="left-panel flex column">
          <div className="total-board">
            <p>Total Confirmed</p>
            <span className="confirmed-total">{confirmedTotal}</span>
          </div>
          <div className="country-ranks">
            <p>Confirmed Cases by Country</p>
            <ol className="rank-list">
              {confirmedSpinner ? (
                <p>로딩중</p>
              ) : confirmedList.length !== 0 ? (
                confirmedList.map((item, i) => (
                  <li key={i} className="list-item flex align-center" onClick={() => handleDetailItem(item)}>
                    <span className="cases">{item.defCnt}</span>
                    <p className="country">{item.gubun}</p>
                  </li>
                ))
              ) : (
                <p> 조회된 데이터가 없습니다.</p>
              )}
            </ol>
          </div>
          <p className="last-updated-time flex justify-center align-center">{lastUpdatedTime}</p>
        </div>
        <div className="right-panel">
          <div className="summary-wrapper flex">
            <div className="deaths-container">
              <h3 className="summary-title">Total Deaths</h3>
              <p className="total deaths">{deathTotal}</p>
              <div className="list-wrapper">
                <ol className="deaths-list">
                  {deathSpinner ? (
                    <p>로딩중</p>
                  ) : deathList.length !== 0 ? (
                    deathList.map((item, i) => (
                      <li key={i} className="list-item flex align-center">
                        <span className="cases deaths">{item.deathCnt}</span>
                        <p className="country">{item.gubun}</p>
                        <p className="std-day">{item.stdDay}</p>
                      </li>
                    ))
                  ) : (
                    <p> 조회된 데이터가 없습니다.</p>
                  )}
                </ol>
              </div>
            </div>

            <div className="recovered-container">
              <h3 className="summary-title">Total Recovered</h3>
              <p className="total recovered">{recoveredTotal}</p>
              <div className="list-wrapper">
                <ol className="recovered-list">
                  {
                    recoveredSpinner ? (<p>로딩중</p>) : (
                      recoveredList.length !== 0 ? (
                        recoveredList.map((item, i) => (
                          <li key={i} className="list-item flex align-center">
                            <span className="cases recovered">{item.isolClearCnt}</span>
                            <p className="country">{item.gubun}</p>
                            <p className="std-day">{item.stdDay}</p>
                          </li>
                        ))
                      ) : (
                        <p> 조회된 데이터가 없습니다.</p>
                      )
                    )
                  }
                </ol>
              </div>
            </div>
          </div>
          <div className="chart-container">
            {deathList.length === 0 ? <p>먼저 조회 해주세요!</p> : <CoronaChart cityName={chartData.name} labels={chartData.labels} valueList={chartData.valueList} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Corona;
