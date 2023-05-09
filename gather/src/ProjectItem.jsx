// import testPage01 from "./pages/testPage01";
import { Link } from 'react-router-dom';
const ProjectItem = ({pInfo}) =>{
  const handleClick = () =>{
    console.log(pInfo)
  }
  
  return (
    <Link to={`/test/${pInfo.path}`} className="project-item my-3" onClick={handleClick}>{pInfo.name} </Link>
  )
}

export default ProjectItem;