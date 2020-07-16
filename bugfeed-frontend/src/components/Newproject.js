import React , {Component} from 'react';
import { Editor } from '@tinymce/tinymce-react'
import {Form} from 'semantic-ui-react'
import axios from 'axios';
import '../css/Newproject.css'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import {GET_USER_URL} from '../Const'
import {urlWikimediaApi} from '../urls'

class AddProject extends Component{
    constructor(props){
        super(props)
        this.state={
                project_name:'',
                project_wiki:'',
                project_link:'',
                priority_value:'',
                project_members:[],
                userList : []
        }
    }

  //   componentDidMount(){
  //     authenticate()
  //     axios.get(GET_USER_URL)
  //     .then(response => {
  //         this.setState({userList: response.data})
  //     })
  // }


    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
        }

    handleEditorChange = content => {
      this.setState({ ...this.state, project_wiki: content },
    )
  }

    handleTeamChange = (event, {value}) => {
      this.setState({project_members:value})
  }

    handlePriorityChange = (event,{value}) => {
      this.setState({priority_value:value})
    }

    handleSubmit = (event) => {
      event.preventDefault()

      let formData = new FormData()

      formData.append(
        'project_name',
        this.state.project_name
      )

      formData.append(
        'project_wiki',
        this.state.project_wiki
      )

      formData.append(
        'project_link',
        this.state.project_link
      )

      for(let i = 0; i < (this.state.project_members).length; i++){
        formData.append(
            'project_members',
            this.state.team_member[i]
        )

      formData.append(
        'priority_value',
        this.state.priority_value
      )
      
      axios.post('http://localhost:8000/bugfeed/projects/', formData )
      .then(res => {
          this.props.history.push('/projects/'+res.data.id)
      })
      .catch(err =>{
          console.log(err)
      })

      
    }

    }
    
    handleUpload = (callback, value, meta) => {
      window.addEventListener('message', (event) => {
            const { path } = event.data
            const data = {
              path,
            }
            const headers = {
              'Content-Type': 'application/json',
            }
            if(path) {
              axios({
                method: 'post',
                url: urlWikimediaApi(),
                data: data,
                headers: headers,
              }).then(response => {
                const { path } = response.data
                callback(path)
              })
            }
          })    
        }

        render(){
          var options =[]
          if (this.state.userList[0]){
            options = this.state.userList.map((user) => ({
              key : user.id,
              text: user.name + '' + user.enrol_number,
              value: user.id

            }))
          }

          const tinyEditor = (
            <Editor initialValue={this.state.project_wiki}
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
        branding: false,
        file_picker_callback: (callback, value, meta) => {
          this.handleUpload(callback, value, meta)
        },
        }}
        onEditorChange={this.handleEditorChange}/>
          )

        const values = ('High','Low','Moderate','Released') 
        
        const form = (

          <Form onSubmit = {this.handleSubmit} encType='multipart/form-data'>

            <Form.Input 
                    name = 'project_name' 
                    placeholder = {'Your project name here'}
                    label='Project Name:' 
                    type = 'text' 
                    onChange={this.handleChange}
                    className = 'input_small'
                     />

            <Form.Field>
                    <label>Project wiki:</label>
                    {tinyEditor}
            </Form.Field>

            <Form.Input 
                    name = 'project_link' 
                    placeholder = {'Your project URL here'}
                    label='Project Link:' 
                    type = 'text' 
                    onChange={this.handleChange}
                     />

             <Form.Dropdown
                    name = 'project_members'
                    label = 'Add team members:'
                    placeholder='Add team members'
                    multiple
                    search
                    selection
                    options={options}
                    className = 'input_small'
                    onChange={this.handleTeamChange}
                />

             <Form.Dropdown
                   name = 'priority_value'
                   label = 'Set the priority of the project'
                   placeholder=' Add priority value'
                   search
                   selection
                   options = {values}
                   className = 'input_small'
                   onChange = {this.handlePriorityChange}
                   />

                <Form.Button positive> Create new project</Form.Button>
            </Form>
          )

          return (
            <div className='page-container'>
            <header className='main-heading'> Create new project</header>
            <div className = 'form-container'>
            {form}
            </div>
            </div>
            )
      }
    }

    const mapStateToProps = (state) => ({
      user : state.user
  })
  
    withRouter(AddProject)
  
    export default connect(mapStateToProps)(AddProject)