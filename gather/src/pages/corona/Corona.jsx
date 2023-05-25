// import { useReducer } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getConfirmedCountry } from './../../store/actions/corona/confirmed'
import { useCallback, useEffect } from 'react';
const Corona = () => {
  const confirmed = useSelector((state)=> state.confirmed);
  const dispatch = useDispatch();
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const { confirmTotal, deathTotal, recoveredTotal, listItem, lastUpdatedTime, selectedId, isDeathLoading } = state;
  useCallback(()=>{
    dispatch(getConfirmedCountry())
  },[])
  const handleClick = () =>{
    dispatch(getConfirmedCountry());
  }
  console.log(confirmed)
  return (
    <div onClick={handleClick}>test</div>
    // <body>
    //   <header class="flex justify-center">
    //     <h1>코로나 세계 현황판</h1>
    //   </header>
    //   <main class="flex">
    //     <div class="left-panel flex column">
    //       <div class="total-board">
    //         <p>Total Confirmed</p>
    //         <span class="confirmed-total">{confirmTotal}</span>
    //       </div>
    //       <div class="country-ranks">
    //         <p>Confirmed Cases by Country</p>
    //         <ol class="rank-list" onClick={handleListClick}>
    //           {listItem.map((item, i) => (
    //             <li key={i} class="list-item flex align-center">
    //               <span class="cases">{item.TotalConfirmed.toString()}</span>
    //               <p class="country">{item.Country}</p>
    //             </li>
    //           ))}
    //         </ol>
    //       </div>
    //       <p class="last-updated-time flex justify-center align-center">{lastUpdatedTime}</p>
    //     </div>
    //     <div class="right-panel">
    //       <div class="summary-wrapper flex">
    //         <div class="deaths-container">
    //           <h3 class="summary-title">Total Deaths</h3>
    //           <p class="total deaths">{deathTotal}</p>
    //           <div class="list-wrapper">
    //             <ol class="deaths-list"></ol>
    //           </div>
    //         </div>
    //         <div class="recovered-container">
    //           <h3 class="summary-title">Total Recovered</h3>
    //           <p class="total recovered">{recoveredTotal}</p>
    //           <div class="list-wrapper">
    //             <ol class="recovered-list"></ol>
    //           </div>
    //         </div>
    //       </div>
    //       <div class="chart-container">
    //         <canvas id="lineChart" class="corona-chart"></canvas>
    //       </div>
    //     </div>
    //   </main>
    // </body>
  );
};

export default Corona;
