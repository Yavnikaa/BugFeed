import React from 'react'
import axios from 'axios';
import * as api_links from '../APILinks'
import EditProjectDialog from '../components/EditProjectDialog'
import NewBug from '../components/NewBug'


const ProjectPage = (props) => {

    const currentUser = localStorage.getItem('id');

    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [project, setProject] = React.useState({});

    const [tagNameList, setTagNameList] = React.useState();

    const [tagList, setTagList] = React.useState();
  
    const [userNameList, setUserNameList] = React.useState();
  
    const [enrNoList, setEnrNoList] = React.useState();
  
    const [projectID, setProjectID] = React.useState();

    React.useEffect(() => {
        
        axios.get(api_links.API_ROOT + 'projectnameslug/')
          .then(res => {
            const projectslug = props.match.params.projectslug;
            const requiredProject = res.data.filter(project => project.projectslug === projectslug)[0];
            setProjectID(requiredProject.id);
            setProject(requiredProject);
    
            axios.get(api_links.API_ROOT + `projects/${requiredProject.id}/`)
              .then(res1 => {
    
                axios.get(api_links.API_ROOT + 'tags/')
                  .then(res2 => {
                    let tagList = res2.data;
                    setTagList(tagList);
                    let tagNameList = {};
                    res2.data.map(tag => {
                      tagNameList[tag.id] = {
                        tagValue: tag.tag_value,
                        tagColor: tag.color
                      };
                    });
                    setTagNameList(tagNameList);
    
                axios.get(api_links.API_ROOT + 'users/')
                  .then(res3 => {
                    let userNameList = {};
                    res3.data.map(user => userNameList[user.id] = user.name);
                    setUserNameList(userNameList);
                    let userEnrNoList = {};
                    res3.data.map(user => userEnrNoList[user.id] = user.enrollment_number);
                    setEnrNoList(userEnrNoList);
                  })
                  .catch(err => console.log(err));
    
              })
              .catch(err => console.log(err));
    
          })
          .catch(err => console.log(err));
      }, []);
    });

     return (
       <div>
         <NewBug project={project.id} project_name={project.project_name}/>

         <EditProjectDialog projectID={project.id} project_name={project.project_name}/>

       </div>
     )

    
}

export default ProjectPage;
