import React, { useState } from "react";
import ProjectItem from "./ProjectItem";


const ProjectList = () => {
  const [projectList, setProjectList] = useState([
    { path: "searchMine", name: "지뢰찾기" },
    { path: "corona", name: "코로나" },
    { path: "test/03", name: "Project 03" },
    { path: "test/04", name: "Project 04" },
    { path: "test/05", name: "Project 05" },
    { path: "test/06", name: "Project 06" },
    { path: "test/07", name: "없는 페이지" },
    
  ]);

  return (
      <div className="project-list p-8">
        {projectList.map((pInfo, i) => {
          return <ProjectItem pInfo={pInfo} key={pInfo.path} />;
        })}
      </div>
  );
};

export default ProjectList;
