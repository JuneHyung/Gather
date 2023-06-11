import { useSelector } from "react-redux";

import NoData from "../../../components/corona/NoData";
import Spinner from "../../../components/corona/Spinner";

const Recovered = () => {
  const { recoveredTotal, recoveredList, recoveredSpinner } = useSelector((state) => state.recovered);
  return (
    <div className="recovered-container">
      <h3 className="summary-title">Total Recovered</h3>
      <p className="total recovered">{recoveredTotal}</p>
      <div className="list-wrapper">
        <ol className="recovered-list">
          {recoveredSpinner ? (
            <Spinner></Spinner>
          ) : recoveredList.length !== 0 ? (
            recoveredList.map((item, i) => (
              <li key={i} className="list-item flex align-center">
                <p className="std-day">{item.stdDay}</p>
                <p className="country">{item.gubun}</p>
                <span className="cases recovered">{item.isolClearCnt}</span>
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
export default Recovered;
