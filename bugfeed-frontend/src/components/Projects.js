import React, {Component} from 'react';
import ProjectDisplay from './Project-display'
import {urlProjectApi} from '../urls'
import '../css/Projects.css';


class ProjectsPage extends Component {
  constructor(props) {
    super(props)
    this.state = ''
  }

  componentDidMount(){
     this.retrieve()
  }
  
  retrieve = card => {
    const URL = `${urlProjectApi()}/`
    this.props.requestProjectData(URL)
    this.setState({card})
  }
  



  render(){
    if (this.props.apiProjectData && this.props.apiProjectData.loaded){
      return (
        <div className='page-container'>
          <div className ='heading-container'>
          <div className="Project-container">Project List</div>
          <a href="http://localhost:3000/add_project" className="link-newproject"> + </a>
          <div className="newproject-text">Create new project</div>
          </div>
          <div className='cardsdisplay'>
            {this.props.apiProjectData.data.results.map(project =>(
              <ProjectDisplay project={project}/> ))}
          </div>
        </div>
      )
    }
    else {
      return null
    }
  }

}

export default ProjectsPage


