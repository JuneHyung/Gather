import React, { useState } from "react";
import ProjectItem from "./ProjectItem";


const ProjectList = () => {
  const [projectList, setProjectList] = useState([
    { path: "01", name: "지뢰찾기" },
    { path: "02", name: "코로나" },
    { path: "03", name: "Project 03" },
    { path: "04", name: "Project 04" },
    { path: "05", name: "Project 05" },
    { path: "06", name: "Project 06" },
    { path: "07", name: "없는 페이지" },
    
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
