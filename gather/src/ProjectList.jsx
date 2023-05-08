import React, {useState} from 'react';
import ProjectItem from "./ProjectItem";

const ProjectList = () =>{
  const [projectList, setProjectList] = useState([
    {path: '01', name: 'P01',},    
    {path: '02', name: 'P02'},
    {path: '03', name: 'P03'},
    {path: '04', name: 'P04'},
    {path: '06', name: 'P06'},
    {path: '07', name: 'P05'},
    {path: '07', name: 'P07'},
    {path: '08', name: 'P08'},
    {path: '09', name: 'P09'},
    {path: '10', name: 'P10'},
  ]);

  return (
    <div className="project-list p-8">
      {
        projectList.map((pInfo, i)=> { 
            return (
              <ProjectItem pInfo={pInfo} key={pInfo.path} />
            )
          }
        )
      }
    </div>
  )
}

export default ProjectList;