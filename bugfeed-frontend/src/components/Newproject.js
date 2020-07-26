import React , {useState,useEffect} from 'react';
import axios from 'axios';
import '../css/Newproject.css'
import * as api_links from '../APILinks';
import { EditorState } from 'draft-js';
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from 'draftail';
import { stateToHTML } from 'draft-js-export-html';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

export default function NewProject(props){
    const [formData,setFormData]=useState({
        project_name : "",
        project_link : "",
        priority_value : "",
    })

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevValue => ({
          ...prevValue,
          [name]: value
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
        let data = {
              project_name: formData.project_name,
              project_wiki: stateToHTML(editorState.getCurrentContent()),
              project_link: formData.project_link,
              priority_value: formData.priority_value,
             };
             
        const token = localStorage.getItem('token');

        axios.defaults.headers = {
               'Content-Type': 'application/json',
               Authorization: 'Token  ' + token
        }

        axios.post(api_links.API_ROOT + 'projects/', data)
        .then(res => {
        setTimeout(() => {
            if (res.status === 200) {
                let project_id = res.data.id;
                data = new FormData();
                data.append('project', project_id);
                data.append('project_members', project_members)
                axios.defaults.headers = {
                  'Content-Type': 'application/json',
                  Authorization: 'Token  ' + token
                }
                axios.post(api_links.API_ROOT + 'teams/', data)
                  .then(res => {
                    console.log(res);
                    window.location.reload();
                  })
                  .catch(err => {
                    console.log(err);
                  });
               }
            },2000);
        window.location.reload()
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    useEffect(() => {
        fetchUserListFromAPI();
      }, []);

    const priorityValues = ["HIGH", "MODERATE", "LOW", "RELEASED"]

    const [editorState, setEditorState]=useState(EditorState.createEmpty());

    const handleRichTextChange = editorState => {
      setEditorState(editorState);
    }
    

    return (
        <div className='page-container'>
        <header className='main-heading'> Create new project</header>
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
              <DraftailEditor
                editorState={editorState}
                onChange={handleRichTextChange}
                blockTypes={[
                  { type: BLOCK_TYPE.HEADER_THREE },
                  { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
                  { type: BLOCK_TYPE.ORDERED_LIST_ITEM },
                ]}
                inlineStyles={[
                  { type: INLINE_STYLE.BOLD },
                  { type: INLINE_STYLE.ITALIC },
                  { type: INLINE_STYLE.UNDERLINE },
                  { type: INLINE_STYLE.CODE },
                  { type: INLINE_STYLE.STRIKETHROUGH },
                ]}
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
              Create Project
                </Button>

             <a href='http://localhost:3000/' className='cancel-button'> Cancel</a>
             </Grid>
        </form>
        </div>
        </div>

        
    )
}
