import React from 'react'
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import axios from 'axios';
import * as api_links from '../APILinks';
import { Link } from "react-router-dom";
import '../css/Project-display.css'

export default function ProjectDisplay(props){

    const [project, setProject] = React.useState({});

    React.useEffect(() => {
        axios.get(api_links.API_ROOT + `projects/${props.projectID}/`)
          .then(res => {
            setProject(res.data);
          })
          .catch(err => console.log(err));
      }, [props]);

    const handleProjectDelete = () => {
        let c = window.confirm("This project will be deleted permanently. Are you sure?")
        c && axios.delete(api_links.API_ROOT + `projects/${props.projectID}/`)
          .then(res => {
            setTimeout(() => {
              window.location.href = '/projects';
            }, 1000);
          })
          .catch(err => {
            console.log(err);
          });
        }

    return (
        <Card className='project-card' variant='outlined'>
        <CardHeader className='card-heading'>
        <Link to={"/projects/" + props.projectslug}>
        {project.project_name}
        </Link>
        </CardHeader>
        <CardContent>
        <div className='card-link'>{project.project_link}</div>
        <div className='card-text'>Created by: {project.created_by}</div>
        <div>{project.project_date}</div>
        
        <Button onClick={handleProjectDelete} className='card-button'> Delete Project</Button>
        </CardContent>

        </Card>
    )

    
}

// import React,{Component} from 'react'
// import '../css/Project-display.css'
// import {urlProjectsApp} from '../urls.js'


// class ProjectDisplay extends Component{
//     constructor(props){
//         super(props)
//         this.state= {
//             data:{}
//         }

//     }
    
//     delete(project){
//         const newState = this.state.data.slice();
//             if (newState.indexOf(project) > -1) {
//                     newState.splice(newState.indexOf(project), 1);
//                         this.setState({data: newState})
//     }
// }

    

//     render (){
//         const {project} = this.props
//         return (
//         <div className='card'>
//             <a href={`${urlProjectsApp()}/${project.id}`}>
//             <div className='card-title'>
//             <div className='card-heading'> {project.project_title} </div>
//             <div className='dot'></div>
//             </div>
//             <div className='card-link'>{project.project_link} </div>
//             <div className='card-text'>Created by: {project.created_by} <br></br>
//             {project.project_date}</div>
//             <div className='card-button' onClick={this.history.push('http://localhost:3000/add_project')}> Edit Project </div>
//             <div className='card-button' onClick={this.delete.bind(this.project)} >Delete</div>
//             </a>
//         </div>
//     )
// }
// }
    

// export default ProjectDisplay