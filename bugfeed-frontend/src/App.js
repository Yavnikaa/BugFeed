import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux'

import Login from './container-components/Login'
import ProjectsPage from './container-components/Projects'
import UserPage from './container-components/UserPage'
import AddProject from './components/Newproject'
import Onlogin from './container-components/Onlogin'
//import Navbar from './components/Navbar'

import store from './store/index'


function App() {
  return (
    <Provider store = {store}>
      <Router>
    
        <Switch>


          <Route exact path = '/login'>
              <Login/>
          </Route>


          <Route path = '/onlogin' component = {Onlogin}/>

          <Route exact path = '/projects' component = {ProjectsPage}/>

          <Route exact path = '/users' component = {UserPage}/>

          <Route exact path = '/add_project' component = {AddProject}/>

         

        </Switch>

      

      </Router>
    </Provider>
  );
}

export default App