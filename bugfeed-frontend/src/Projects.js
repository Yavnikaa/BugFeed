import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import './css/Projects.css';
import { Helmet } from 'react-helmet';
import Logo from './assets/bugfeed-logo.png'
import Home from './assets/home-icon.png'
import Settings from './assets/settings.png'
import './assets/Home-icon-hover.jpg'
import notifications from './assets/notifications.png'

function changeImage(e) {
  e.target.setAttribute( 'src','./assets/Home-icon-hover.jpg');
  e.target.setAttribute('alt', 'home-icon-hover');
}

const element = (
    <div>
    <Helmet>
    <title>BugFeed</title>
    </Helmet>
    

    <div className="navbar-container">
      <img src= {Logo} className="logo-container" alt="Bug-feed-logo"/>
      <div className="logo-text">BugFeed</div>
      <img src={Home} className="icon-home" alt="home-icon" onClick={changeImage}/>
      <img src={Settings}  alt="settings-icon" className="settings-icon"/>
      <img src={notifications} alt="notifications-icon" className="notifs-icon"/>
    </div>
    <div className='heading-container'>
    <div className="Project-container">Project List</div>
    <a href="http://localhost:3000/newproject" className="link-newproject"> + </a>
    <div className="newproject-text">Create new project</div>
    </div>
    </div>
    );

  


ReactDOM.render(element, document.getElementById('root'));