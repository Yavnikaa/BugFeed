import React , {useState,useEffect} from 'react';
import axios from 'axios';
import * as api_links from '../APILinks';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from '@tinymce/tinymce-react';

import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

export default function ReportBug(props){
    const [formData,setFormData] = useState({
        bug_heading : '',
        category : '',
        assigned_to : '',
        status : '',
        other_text : '',
 })

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevValue => ({
      ...prevValue,
      [name]: value}));
  }

    const [userList, setUserList] = React.useState([]);
    async function fetchUserListFromAPI() {
    axios.get(api_links.API_ROOT + 'users/')
      .then(res => {
        setUserList(res.data);
      })
      .catch(err => console.log(err));
  }
    
    const [tags, setTags] = React.useState([]);
    async function fetchTagListFromAPI() {
    axios.get(api_links.API_ROOT + 'tags/')
      .then(res => {
        setTags(res.data);
      })
      .catch(err => console.log(err));
  }

    
  
    const [tagsID, setTagsID] = React.useState([]);
    const handleTagsChange = (event) => {
       setTagsID(event.target.value);
  };

    
  
    const [editorState, setEditorState] = useState([]);
    
    const handleRichTextChange = editorState => {
        setEditorState(editorState);
      }


    const handleFormSubmit = (event) => {
      event.preventDefault();
      let data = {
          bug_heading : formData.bug_heading,
          category : tagsID,
          assigned_to : formData.assigned_to,
          status: formData.status,
          other_text: formData.other_text,
          project_bug : props.project_bug,
          bug_description : stateToHTML(editorState.getCurrentContent()),
};        
           
     const token = localStorage.getItem('token');

      axios.defaults.headers = {
             'Content-Type': 'application/json',
             Authorization: 'Token  ' + token
      }

      axios.post(api_links.API_ROOT + 'bugs/', data)
      .then(res => {
        data = new FormData();
      })
     .catch(err => {
        console.log(err);
       });

    }


    useEffect(() => {
        fetchUserListFromAPI();
        fetchTagListFromAPI();
      }, []);

    const statusValues = ["PENDING", "RESOLVED" , "TO_BE_DISCUSSED"]

    return (
      <form noValidate onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
            
            <Grid item xs={12}>
            <TextField
            name="Bug Heading"
            variant="outlined"
            halfWidth
            id="bug_heading"
            label="bug_heading"
            onChange={handleFormChange}
            value = {formData.bug_heading}
  />
            </Grid>

            <Grid item xs={12} className="custom-form-outline-padding-none">
            <Typography style={{ padding: "5px" }}>Bug Description </Typography>
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
            <InputLabel id="demo-mutiple-chip-label" > Category </InputLabel>
            <Select
            labelId="mutiple-chip-label"
            id="mutiple-chip"
            multiple
            style={{maxWidth: '350px'}}
            value={tagsID}
            onChange={handleTagsChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => {
              let y = {};
              tags.map(obj => {
                y[obj.id] = obj.tag_value;
                });
                return (
                <div >
                {selected.map((value) => (
                  <Chip label={y[value]} key={value} style={{ margin: "5px", borderRadius: '10px' }} />
                  ))}
                   </div>)}}>
                   {tags.map((category) => (
                     <MenuItem key={category.tag_value} value={category.id}>
                     </MenuItem>))}
                     </Select>
                     </Grid>

            <Grid item xs={12}>
            <TextField
            name="Specify others' category."
            variant="outlined"
            halfWidth
            id="other_text"
            label="other_text"
            onChange={handleFormChange}
            value = {formData.other_text}
  />
            </Grid>

            <Grid item xs={12} className="custom-form-outline">
                     <InputLabel id="single-select-outlined-label">Status Value</InputLabel>
                     <Select
                     labelId="single-select-outlined-label"
                     id="single-select-outlined"
                     value={formData.status}
                     onChange={handleFormChange}
                     label="status"
                     name="status">
                     {statusValues.map(option => <MenuItem value={option}>{option}</MenuItem>)}
                     </Select>
            </Grid>

            <Grid item xs={12} className="custom-form-outline">

              <InputLabel id="single-select-outlined-label" > Assign To:</InputLabel>
              <Select

                labelId="single-select-outlined-label"
                id="single-select-outlined"
                multiple
                value= {formData.assigned_to}
                onChange={handleFormChange}
                label="Assigned To"
                name="assigned_to"
                >
                  <MenuItem value="">
                    <em>Select a user</em>
                  </MenuItem>
                  {userList.map(user => <MenuItem value={user.id}>{user.name}</MenuItem>)}
              </Select>

            </Grid>

            
            <Button
                type="submit"
                halfWidth
                variant="contained"
                color="secondary"
                style={{ marginTop: "20px" }}

              >
              Report Bug
              </Button>
              
              </Grid>
              </form>

    )

    
}
