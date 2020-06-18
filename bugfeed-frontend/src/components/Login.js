import React from 'react';
import { CLIENT_ID, REDIRECT_URL, GET_ACCESS_CODE_URL } from '../Const'
import '../css/Homepage.css';

const Login = () => {
    
            return(
              <div className='site-container'>
                  <div className='logo-container'></div>
                   <div className='name-container'>BugFeed </div>
                  <div className='login-container'>
                     <div className='omniport-logo'></div>
                    <a href={GET_ACCESS_CODE_URL+'?client_id='+CLIENT_ID+'&redirect_url='+REDIRECT_URL} className='login-text'>Login with omniport</a>
                   </div>
                 </div>   
            )
        }


export default Login;

