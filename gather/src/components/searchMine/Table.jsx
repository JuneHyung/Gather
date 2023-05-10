import { memo, useContext } from "react"
import { TableContext } from "../../pages/searchMine/SearchMine";
import Tr from "./Tr";

const Table = memo(()=>{
  const {tableData} = useContext(TableContext);
  return(
    <table className="mine-table">
      <tbody>
        {Array(tableData.length).fill().map((tr, i)=> <Tr key={i} rowIndex={i} />)}
      </tbody>
    </table>
  )
})

export default Table;