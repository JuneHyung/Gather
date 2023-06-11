import { useSelector } from "react-redux";

import NoData from "../../../components/corona/NoData";
import Spinner from "../../../components/corona/Spinner";

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
                <p className="std-day">{item.stdDay}</p>
                <p className="country">{item.gubun}</p>
                <span className="cases deaths">{item.deathCnt}</span>
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
