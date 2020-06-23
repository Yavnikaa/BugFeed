// import React , {Component} from 'react'
// import '../css/Navbar.css'
// import Logo from '../assets/bugfeed-logo.png'
// import Home from '../assets/home-icon.png'
// import Settings from '../assets/settings.png'
// import notifications from '../assets/notifications.png'
// import {Helmet} from 'react-helmet'
// import {Image, Dropdown} from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'

// class Navbar extends Component{

//   render() {

//     const options = [
//       { key: 'user', as: Link, to:'/projects',text: 'My page', icon: 'user' },
//       { key: 'sign-out', as: Link, to:'/logout', text: 'Sign Out', icon: 'sign out', },
//     ]

//     if (this.props.user.token){
//       return (
//         <div>
//         <Helmet>
//         <title>BugFeed</title>
//         </Helmet>
//         <div className="navbar-container">
//         <img src= {Logo} className="logo-container" alt="Bug-feed-logo"/>
//         <div className="logo-text">BugFeed</div>
//         <img src={Home} className="icon-home" alt="home-icon" />
//         <img src={Settings}  alt="settings-icon" className="settings-icon"/>
//         <img src={notifications} alt="notifications-icon" className="notifs-icon"/>
//         <div className="text">{this.props.user.user.name}</div>
//        <Image size='mini' className='display' src={this.props.user.display_picture}/>
//        <Dropdown options = {options}
//        pointing='top left' />
//        </div>
//       </div>


//       )
//     }

//     return ('')
//   }
// }

// const mapStateToProps = (state) => ({
//   user : state.item
// })


// export default connect(mapStateToProps)(Navbar)

