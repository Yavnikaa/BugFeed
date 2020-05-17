import React from 'react';
import ReactDOM from 'react-dom';
import './css/Homepage.css';

const element = (
    <div class='site-container'>
    <div class='logo-container'></div>
    <div class='name-container'>BugFeed </div>
    <div class='login-container'>
      <div class='omniport-logo'></div>
      <div class='login-text'>Login with omniport</div>
    </div>
    </div>
    )

ReactDOM.render(element, document.getElementById('root'));