import { useSelector } from "react-redux";

const ConfirmedTotal = () =>{
  const { confirmedTotal} = useSelector((state) => state.confirmed);
  return (
    <div className="total-board">
      <p>Total Confirmed</p>
      <span className="confirmed-total">{confirmedTotal}</span>
    </div>
  )
}

export default ConfirmedTotal;