import React from 'react';
import ReactDOM from 'react-dom';
import './Projects.css';
import { Helmet } from 'react-helmet';
import Logo from './assets/bugfeed-logo.png'
import Home from './assets/home-icon.png'
import Settings from './assets/settings.png'


const element = (
    <div>
    <Helmet>
    <title>BugFeed</title>
    </Helmet>
    

    <div class="navbar-container">
      <img src= {Logo} class="logo-container" alt="Bug-feed-logo"/>
      <div class="logo-text">BugFeed</div>
      <img src={Home} class="icon-home" alt="home-icon"/>
      <img src={Settings} class="icon-settings" alt="settings-icon"/>
    </div>
    </div>
    );


ReactDOM.render(element, document.getElementById('root'));