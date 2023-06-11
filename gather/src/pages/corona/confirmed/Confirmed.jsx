import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeathList } from "../../../store/actions/corona/death";
import { getRecoveredList } from "../../../store/actions/corona/recovered";

import NoData from "../../../components/corona/NoData";
import ConfirmedTotal from "./ConfirmedTotal";
import LastUpdatedTime from "./LastUpdatedTime";
import Spinner from "../../../components/corona/Spinner";

const Confirmed = () => {
  const { confirmedList, confirmedSpinner } = useSelector((state) => state.confirmed);
  const { deathSpinner } = useSelector((state) => state.death);
  const { recoveredSpinner } = useSelector((state) => state.recovered);
  const dispatch = useDispatch();
  
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
    <>
      <ConfirmedTotal></ConfirmedTotal>
      <div className="country-ranks">
        <p>Confirmed Cases by Country</p>
        <ol className="rank-list">
          {confirmedSpinner ? (
            <Spinner></Spinner>
          ) : confirmedList.length !== 0 ? (
            confirmedList.map((item, i) => (
              <li key={i} className="list-item flex align-center" onClick={() => handleDetailItem(item)}>
                <span className="cases">{item.defCnt}</span>
                <p className="country">{item.gubun}</p>
              </li>
            ))
          ) : (
            <NoData></NoData>
          )}
        </ol>
      </div>
      <LastUpdatedTime></LastUpdatedTime>
    </>
  );
};

export default Confirmed