import { useSelector } from "react-redux";

import NoData from "../common/NoData";
import Spinner from "../common/Spinner";

const Death = () => {
  const { deathTotal, deathList, deathSpinner } = useSelector((state) => state.death);
  return (
    <div className="deaths-container">
      <h3 className="summary-title">Total Deaths</h3>
      <p className="total deaths">{deathTotal}</p>
      <div className="list-wrapper">
        <ol className="deaths-list">
          {deathSpinner ? (
            <Spinner></Spinner>
          ) : deathList.length !== 0 ? (
            deathList.map((item, i) => (
              <li key={i} className="list-item flex align-center">
                <span className="cases deaths">{item.deathCnt}</span>
                <p className="country">{item.gubun}</p>
                <p className="std-day">{item.stdDay}</p>
              </li>
            ))
          ) : (
            <NoData></NoData>
          )}
        </ol>
      </div>
    </div>
  );
};
export default Death;
