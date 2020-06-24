import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux'

import Login from './components/Login'
import Auth from './components/auth'
import ProjectsPage from './container-components/Projects'
import UserPage from './container-components/UserPage'
import Logout from './components/Logout'
import AddProject from './components/Newproject'
import ComposedClass from './components/Session.js'
import Navbar from './components/Navbar'

import store from './store/index'


function App() {
  return (
    <Provider store = {store}>
      <Router>
       
       <Navbar></Navbar>
    
        <Switch>


          <Route exact path = '/'>
              <Login/>
          </Route>

          <Route path="/test" component={ComposedClass} />

          <Route path = '/auth' component = {Auth}/>

          <Route exact path = '/projects' component = {ProjectsPage}/>

          <Route exact path = '/users' component = {UserPage}/>

          <Route exact path = '/logout' component = {Logout}/>

          <Route exact path = '/add_project' component = {AddProject}/>

         

        </Switch>

      

      </Router>
    </Provider>
  );
}

export default App