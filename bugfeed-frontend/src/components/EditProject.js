import React , {useState,useEffect} from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import * as api_links from '../APILinks';
import { stateToHTML } from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import '../css/Newproject.css'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';


export default function EditProjectForm(props){
    const [formData, setFormData] = useState({});
    const [editedFormData, setEditedFormData] = useState({});

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevValue => ({
          ...prevValue,
          [name]: value
        }));
        setEditedFormData(prevValue => ({
            ...prevValue,
            [name]:value
        }));
      }

    const [project_members, setProjectMembers] = useState ([]);

    const handleMembersChange = (event) => {
          setProjectMembers(event.target.value);
      };

    const [userList, setUserList] = useState([]);


    async function fetchUserListFromAPI() {
           axios.get(api_links.API_ROOT + 'users/')
           .then(res => {
               setUserList(res.data);
        })
        .catch(err => console.log(err));
    }
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
             
        const token = localStorage.getItem('token');

    axios.defaults.headers = {
               'Content-Type': 'application/json',
               Authorization: 'Token  ' + token
        }

        axios.patch(api_links.API_ROOT + `projects/${props.projectID}/`, editedFormData)
        .then(res => {
        setTimeout(() => {
            if (res.status === 200 ||res.status === 202 || res.status === 204) {
                let project_id = res.data.id;
                let data = new FormData();
                data.append('project', project_id);
                data.append('project_members', project_members)
                axios.defaults.headers = {
                  'Content-Type': 'application/json',
                  Authorization: 'Token  ' + token
                }
                if (res.data.project_members !== undefined) {
                    axios.patch(api_links.API_ROOT + `teams/${res.data.project_id}/`, data)
                      .then(res => {
                        console.log(res);
                      })
                      .catch(err => {
                        console.log(err);
                      });
      
                  } else {
                    axios.post(api_links.API_ROOT + `teams/`, data)
                      .then(res => {
                        console.log(res);
                      })
                      .catch(err => {
                        console.log(err);
                      });
      
                  }
                }
                window.location.href = '/projects';
              }, 1000);
            })
            .catch(err => {
              console.log(err);
            });
    }
    
    const [editorState, setEditorState] = useState([]);

    const handleRichTextChange = newEditorState => {
        setEditorState(newEditorState);
        setEditedFormData((prev) => ({
          ...prev,
          project_wiki: stateToHTML(newEditorState.getCurrentContent())
        }));
      }

    async function fetchProjectInfoFromAPI() {
        axios.get(api_links.API_ROOT + `projects/${props.projectID}/`)
          .then(res => {
            setFormData(() => ({
              project_name: res.data.project_name,
              priority_value: res.data.priority_value,
              project_link: res.data.project_link,
              created_by: res.data.created_by,
              }));
            setEditorState(stateFromHTML(res.data.project_wiki));
          })
          .catch(err => console.log(err));
      }

    async function fetchTeamInfoFromAPI(){
        axios.get(api_links.API_ROOT + `teams/${props.projectID}/`)
        .then(res2 => {
            setProjectMembers(res2.data.project_members);
        })
        .catch(err => console.log(err));
    }
    
    useEffect(() => {
        fetchUserListFromAPI();
        fetchProjectInfoFromAPI();
        fetchTeamInfoFromAPI();
      }, []);
    
    const priorityValues = ["HIGH", "MODERATE", "LOW", "RELEASED"]

    return (
        <div className='page-container'>
        <header className='main-heading'>   Edit Project Details </header>
        <div className = 'form-container'>
        <form noValidate onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="project_name"
                variant="outlined"
                fullWidth
                id="project_name"
                label="Project Name"
                value={formData.project_name}
                onChange={handleFormChange}
              />
            </Grid>

        <Grid item xs={12} className="custom-form-outline-padding-none">
            <Typography style={{ padding: "5px" }}>Project Wiki</Typography>
            <Editor
              initialValue={editorState}
              apiKey = '251rxa7mzrbzpc2md4bwm9agjgrqanuba4mbxzy09efwa590'
              init={{
                plugins:
                  'contextmenu ' +
                  ' lists link table image codesample emoticons code charmap ' +
                  ' fullscreen ' +
                  ' wordcount',
                contextmenu:
                  'bold italic underline strikethrough | ' +
                  'superscript subscript | ' +
                  'link',
                toolbar1:
                  'formatselect | ' +
                  'bold italic underline strikethrough blockquote removeformat | ' +
                  'alignleft aligncenter alignright alignjustify',
                toolbar2:
                  'undo redo | ' +
                  'bullist numlist outdent indent | ' +
                  'link unlink | ' +
                  'table image codesample charmap | ' +
                  'fullscreen',
                toolbar3:
                  'fontselect fontsizeselect | emoticons',
                relative_urls : false,
                height: 300,
                width: 'auto',
                menubar: true,
                codesample_languages: [
                  {text: 'HTML/XML', value: 'markup'},
                  {text: 'JavaScript', value: 'javascript'},
                  {text: 'CSS', value: 'css'},
                  {text: 'PHP', value: 'php'},
                  {text: 'Ruby', value: 'ruby'},
                  {text: 'Python', value: 'python'},
                  {text: 'Java', value: 'java'},
                  {text: 'C', value: 'c'},
                  {text: 'C#', value: 'csharp'},
                  {text: 'C++', value: 'cpp'},
                  {text: 'Dart', value: 'dart'},
                  {text: 'Go', value: 'go'},
              ],
                branding: false,
              }}
              onEditorChange={handleRichTextChange}
            />
            </Grid>

            <Grid item xs={12} className="custom-form-outline">

              <InputLabel id="demo-mutiple-chip-label" >Add Project Members</InputLabel>
              <Select

                labelId="mutiple-chip-label"
                id="mutiple-chip"
                multiple
                value={project_members}
                onChange={handleMembersChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div >
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={userList.filter((user, index) => user.id === value)[0].name}
                        style={{ margin: '5px', borderRadius: '10px' }}
                      />
                    ))}
                  </div>
                )}

              >
                {userList.map((user) => (
                  <MenuItem key={user.name} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>

            </Grid>

            <Grid item xs={12} className="custom-form-outline">

              <InputLabel id="single-select-outlined-label">Priority Value</InputLabel>
              <Select
                labelId="single-select-outlined-label"
                id="single-select-outlined"
                value={formData.priority_value}
                onChange={handleFormChange}
                label="priority_value"
                name="priority_value"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {priorityValues.map(option => <MenuItem value={option}>{option}</MenuItem>)}
              </Select>

            </Grid>

            <Grid item xs={12}>
              <TextField
                name="project_link"
                variant="outlined"
                fullWidth
                id="project_link"
                label="Project Link"
                value={formData.project_link}
                onChange={handleFormChange}
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              >
              Save Project Details
                </Button>

             <a href='http://localhost:3000/projects' className='cancel-button'> Cancel</a>
             </Grid>
        </form>
        </div>
        </div>

        
    )




    
}
