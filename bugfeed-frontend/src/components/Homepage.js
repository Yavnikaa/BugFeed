// import React from 'react';
// import '../css/Homepage.css';
// import {urlUserApi} from '../urls.js'


//   const URL = urlUserApi()

   
//   export default function Homepage(props){
//     const {requestUserData}=props
//     return (
//    <div className='site-container'>
//     <div className='logo-container'></div>
//     <div className='name-container'>BugFeed </div>
//     <div className='login-container'>
//       <div className='omniport-logo'></div>
//       <button className='login-text' onClick={()=>requestUserData(URL)}>Login with omniport</button>
//     </div>
//     </div>
//     )}


import React ,{ Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import '../css/Homepage.css';

class Homepage extends Component {
    state = {
        logged_in: false,
        response_received: false
    }

    redirect() {
        window.location ='https://internet.channeli.in/oauth/authorise/?client_id=h8nIeSqFsa0RMKZ8mJp0eGk0ojYbcpK9scDV7Nq5&redirect_url=http://localhost:3000/onlogin/&state=okay'
    }

    componentDidMount() {
        axios({
            url: 'http://127.0.0.1:8000/users/current_user/',
            method: 'get',
            withCredentials: true,
        }).then((response) => {
            console.log(response.data['Response'])
            if(response.data['Response'] === "No Current User"){
                this.setState({
                    logged_in: false,
                    response_received: true
                })
            }
            else{
                this.setState({
                    logged_in: true,
                    response_received: true
                })
            }

            console.log(this.state)
        });
    }

    render(){
        if(this.state.logged_in && this.state.response_received){
            return <Redirect to='/projects' exact/>
        }
        else{
            return(
              <div className='site-container'>
                  <div className='logo-container'></div>
                   <div className='name-container'>BugFeed </div>
                  <div className='login-container'>
                     <div className='omniport-logo'></div>
                    <button className='login-text' onClick={this.redirect}>Login with omniport</button>
                   </div>
                 </div>   
            )
        }
    }
}

export default Homepage;

