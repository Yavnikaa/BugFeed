import React from 'react';
import * as api_links from '../APILinks';
import '../css/Homepage.css';

const Login = () => {
    
            return(
              <div className='site-container'>
                  <div className='logo-container'></div>
                   <div className='name-container'>BugFeed </div>
                  <div className='login-container'>
                     <div className='omniport-logo'></div>
                    <a href={api_links.OMNIPORT_OAUTH} className='login-text'>Login with omniport</a>
                   </div>
                 </div>   
            )
        }


export default Login;

