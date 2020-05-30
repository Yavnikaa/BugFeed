import React,{Component} from 'react'
import '../css/Project-display.css'
import {urlProjectsApp} from '../urls.js'


class ProjectDisplay extends Component{
    constructor(props){
        super(props)
        this.state= {
            data:{}
        }

    }
    
    delete(project){
        const newState = this.state.data.slice();
            if (newState.indexOf(project) > -1) {
                    newState.splice(newState.indexOf(project), 1);
                        this.setState({data: newState})
    }
}

    

    render (){
        const {project} = this.props
        return (
        <div className='card'>
            <a href={`${urlProjectsApp()}/${project.id}`}>
            <div className='card-title'>
            <div className='card-heading'> {project.project_title} </div>
            <div className='dot'></div>
            </div>
            <div className='card-link'>{project.project_link} </div>
            <div className='card-text'>Created by: {project.created_by} <br></br>
            {project.project_date}</div>
            <div className='card-button' onClick={this.history.push('http://localhost:3000/add_project')}> Edit Project </div>
            <div className='card-button' onClick={this.delete.bind(this.project)} >Delete</div>
            </a>
        </div>
    )
}
}
    

export default ProjectDisplay