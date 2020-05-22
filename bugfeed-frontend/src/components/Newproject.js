import React , {Component} from 'react';
import { Editor } from '@tinymce/tinymce-react'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import '../css/Newproject.css'
import {urlProjectApi,urlUserApi,urlProjectsApp} from '../urls'

class AddProject extends Component{
    constructor(props){
        super(props)
        this.state={
            method:'post',
            url:'',
            data:{
                project_name:'',
                project_wiki:'',
                project_link:'',
                created_by:'',
                project_members:[]
            },
            loaded:false
        }
    }

    componentDidMount(){
        axios.get(urlUserApi()).then(axios.spread((initialData,projectMembers)=>{
            initialData=initialData.data
            this.setState({
                method:'patch',
                url:urlProjectApi(),
                data:{
                    ...this.state.data,
                    project_name:initialData.project_name,
                    project_wiki:initialData.project_wiki,
                    project_link:initialData.project_link,
                    created_by:initialData.created_by,
                    project_members:initialData.project_members
                },
                loaded:true
            })
        }))
    }

    handleChange = e => {
        let name = e.target.name
        this.setState({
          data: {
            ...this.state.data,
            [name]: e.target.value,
          },
        })
      }

    
  handleEditorChange = content => {
    this.setState({
      data: { ...this.state.data, project_wiki: content },
    })
  }

    handlePost = () => {
        const {data}=this.state
        if (data.project_name && 
            data.project_link && 
            data.created_by && 
            data.project_members
            ){
            var dataEntered= new dataEntered()
            dataEntered.append('project_name',data.project_name)
            dataEntered.append('project_wiki',data.project_wiki)
            dataEntered.append('project_link',data.project_link)
            dataEntered.append('created_by',data.created_by)
            for(let project_member=0;project_member<data.project_members.length;++project_member) {
                dataEntered.append('project_members', Number(data.project_members[project_member]));
                  }
            
         let headers = {
            'Content-Type': 'multipart/form-data',
            }
            
            

           axios({
               method: this.state.method,
               url: this.state.url,
               data: dataEntered,
               headers: headers,
                  })
               .then(function(response) {
                this.props.history.push(urlProjectsApp())
             })
                .catch(function(response) {
                      if (response.response.data.project_name != null) {
                        this.setState({ project_name: true })
                      } else {
                        this.setState({ project_name: false })
                      }
                      if (response.response.data.project_link != null) {
                        this.setState({ project_link: true })
                      } else {
                        this.setState({ project_link: false })
                      }
                    })
            
            }
         }


    render(){
        const img_members=this.state.users.map(users=>({
          value : users.id,
          text: users.full_name
        }))
        if (this.state.loaded){
            return(
                <div className='page-container'>
                <header className='main-heading'>{this.state.method ==='post'? 'Add new project':'Edit Project Details'}</header>
                <hr></hr>
                <form className='form-container'>
                  <div className='input-set'>
                  <label className='form-label'>Project Name: </label>
                  <input className='form-field' placeholder='Your project name here' name='project-title'
                  value={this.state.data.project_name} onChange={event=>{this.handleChange(event)}} required></input>
                  </div>
                  <div className='input-set'>
                    <label className='form-label'>Project Link</label>
                    <input className='form-field' placeholder='The link for your project here' name='project-link'
                    value={this.state.data.project_link} onChange={event=>{this.handleChange(event)}} required></input>
                  </div>
                  <div className='input-set'>
                    <label className='form-label'>Project-Wiki</label>
                    <Editor initialValue={this.state.data.project_wiki}
                    init={{
                      selector:'textarea',
                      plugins:
                      'autoresize'+
                  'contextmenu ' +
                  ' lists link table image codesample emoticons code charmap ' +
                  ' wordcount'+
                  'fullscreen'+
                  'insertdatetime'+
                  'spellchecker',
                  contextmenu:
                  'bold italic underline strikethrough | ' +
                  'superscript subscript | ' +
                  'link spellchecker',
                toolbar1:
                  'formatselect | ' +
                  'bold italic underline strikethrough blockquote removeformat | ' +
                  'alignleft aligncenter alignright alignjustify',
                toolbar2:
                  'undo redo | ' +
                  'bullist numlist outdent indent | ' +
                  'link unlink | ' +
                  'table image codesample charmap insertdatetime| ' +
                  'fullscreen',
                toolbar3:
                  'fontselect fontsizeselect | spellchecker | emoticons',
                relative_urls : false,
                theme: 'modern',
                menubar: true,
                codesample_languages: [
                  {text: 'HTML/XML', value: 'markup'},
                  {text: 'JavaScript', value: 'javascript'},
                  {text: 'CSS', value: 'css'},
                  {text: 'PHP', value: 'php'},
                  {text: 'Python', value: 'python'},
                  {text: 'Java', value: 'java'},
                  {text: 'C', value: 'c'},
                  {text: 'C++', value: 'cpp'}
              ],
                branding: false,}}
                onEditorChange={this.handleEditorChange}/>
                  </div>

                  <div className='input-set'>
                    <Dropdown
                    placeholder='Select who created the project' fluid selection options={img_members}
                    value={this.state.data.created_by} onChange={event=>{this.handleChange(event)}} required
                    label='Project created by' className='drop-down'
                    />
                   </div>

                   <div className='input-set'>
                     <Dropdown 
                      placeholder='Select the project members' search required multiple selection 
                      label='Project Members' className='drop-down' value={this.state.data.project_members}
                      option={img_members} 
                      onChange={(event, { value }) => {
                        this.setState({
                           data: {
                           ...this.state.data,
                           project_members: value,
                  },
                })
               }}
              />
                  </div>

                  <button className='cancel-button'>Cancel</button>
                  <button className='submit-button' onClick={this.handlePost}>Submit
                  {this.state.method === 'post' ? 'Add Project' :'Update Project'
                  }</button>

                   

                </form>

                </div>
            )
        }

    }
    
}

export default AddProject;


