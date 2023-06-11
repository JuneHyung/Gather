import { useSelector } from "react-redux";

const LastUpdatedTime = () =>{
  const { lastUpdatedTime } = useSelector((state) => state.confirmed);
  return (
    <p className="last-updated-time flex justify-center align-center">{lastUpdatedTime}</p>
  )
}

export default LastUpdatedTime;