import React, { useState } from "react";
import ProjectItem from "./ProjectItem";


const ProjectList = () => {
  const [projectList, setProjectList] = useState([
    { path: "searchMine", name: "지뢰찾기" },
    { path: "corona", name: "코로나" },
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
