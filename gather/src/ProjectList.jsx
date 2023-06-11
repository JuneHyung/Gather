import React, { useState } from "react";
import ProjectItem from "./ProjectItem";
import { porjectInfo } from "./store/constant/projectList";


const ProjectList = () => {
  const [projectList] = useState(porjectInfo);

  return (
      <div className="project-list p-8">
        {projectList.map((pInfo, i) => {
          return <ProjectItem pInfo={pInfo} key={pInfo.path} />;
        })}
      </div>
  );
};

export default ProjectList;
