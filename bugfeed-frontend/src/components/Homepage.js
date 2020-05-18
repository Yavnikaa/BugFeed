import React from 'react';
import '../css/Homepage.css';
import {urlUserApi} from '../urls.js'


  const URL = urlUserApi()

   
  export default function Homepage(props){
    const {requestUserData}=props
    return (
   <div className='site-container'>
    <div className='logo-container'></div>
    <div className='name-container'>BugFeed </div>
    <div className='login-container'>
      <div className='omniport-logo'></div>
      <button className='login-text' onClick={()=>requestUserData(URL)}>Login with omniport</button>
    </div>
    </div>
    )}

  

