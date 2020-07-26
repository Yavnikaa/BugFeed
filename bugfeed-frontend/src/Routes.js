import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";

import Login from './container-components/Login'
import Projects from './container-components/Projects'
import UserPage from './container-components/UserPage'
import NewProject from './components/Newproject'
import Onlogin from './container-components/Onlogin'
import Homepage from './container-components/Homepage'
import ProjectPage from './container-components/ProjectPage';

const BaseRouter = (props) => {
    return (
        <Switch>
            <Route exact path = "/" component={Homepage}></Route>
            <Route exact path = "/login" component={Login}></Route>
            <Route exact path="/onlogin" component={Onlogin} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/users" component={UserPage} />
            <Route exact path='/add_project' component={NewProject}/>
            <Route exact path="/projects/:projectslug" component={ProjectPage} />
        </Switch>
    )
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null,
    }
  }
  
  export default connect(mapStateToProps, null)(BaseRouter);