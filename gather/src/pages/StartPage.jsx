import { useState } from "react";
import { projectInfo } from "../store/constant/projectList";
import { Link } from "react-router-dom";

const StartPage = () => {
  const [projectList] = useState(projectInfo);

  return (
    <div className="start-page">
      <h1 className="start-title">Let's Go React</h1>
      <ul className="start-project-list">
        {projectList.map((pInfo, i) => {
          return <li className="start-project-item"><Link to={`${pInfo.path}`}>{pInfo.name}</Link></li>
        })}
      </ul>
    </div>
  );
};

export default StartPage;
