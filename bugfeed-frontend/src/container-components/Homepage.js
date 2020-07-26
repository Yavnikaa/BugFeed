import React, {useState,useEffect} from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';
import Button from '@material-ui/core/Button' ;
import * as api_links from '../APILinks';


export default function Homepage(){

    const userId = localStorage.getItem('id');
    const [name,setName] = useState('');
    const [enrol_number, setEnrolNumber] = useState('');

    useEffect(() => {
        axios.get(api_links.API_ROOT + `users/${userId}/`)
          .then(res => {
            setName(res.data.name.split(" ")[0]);
            setEnrolNumber(res.data.enrollment_number);
          })
          .catch(err => console.log(err));
        }, []);

    return (
        <div>

        <Link to = "/projects">
        <Button>{'Projects'}
        </Button> 
        </Link>
           
        <Link to= "/users" >
          <Button> {'Users'}
          </Button>
        </Link>
        
        </div>

    )

}