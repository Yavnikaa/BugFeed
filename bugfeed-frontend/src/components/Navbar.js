import React from 'react'
import '../css/Navbar.css'
import Logo from '../assets/bugfeed-logo.png'
import Home from '../assets/home-icon.png'
import Settings from '../assets/settings.png'
import notifications from '../assets/notifications.png'
import {Helmet} from 'react-helmet'
import {Image} from 'semantic-ui-react'

const Navbar = ({info}) => {
    return (
    <div>
    <Helmet>
    <title>BugFeed</title>
    </Helmet>
    <div className="navbar-container">
      <img src= {Logo} className="logo-container" alt="Bug-feed-logo"/>
      <div className="logo-text">BugFeed</div>
      <img src={Home} className="icon-home" alt="home-icon" />
      <img src={Settings}  alt="settings-icon" className="settings-icon"/>
      <img src={notifications} alt="notifications-icon" className="notifs-icon"/>
    <div className="text">{info.username}</div>
    <Image size='mini' className='display' src={info.display_picture}/>
    </div>
    </div>
)
}

export default Navbar