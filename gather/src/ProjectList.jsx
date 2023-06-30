import React, { useState } from "react";
import ProjectItem from "./ProjectItem";
import { projectInfo } from "./store/constant/projectList";


const ProjectList = () => {
  const [projectList] = useState(projectInfo);

  return (
      <div className="project-list p-8">
        {projectList.map((pInfo, i) => {
          return <ProjectItem pInfo={pInfo} key={pInfo.path} />;
        })}
      </div>
  );
};

export default ProjectList;
