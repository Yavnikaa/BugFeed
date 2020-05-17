import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Homepage = lazy(() => import('./Homepage'));
const Projects = lazy(() => import('./Projects'));
const NewProject = lazy(()=> import ('./Newproject'));
const UsersList = lazy(()=> import ('./ProjectList'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/projects" component={Projects}/>
        <Route exact path="/newproject" component={NewProject}/>
        <Route exact path = "/userlist" component={UsersList}/>
      </Switch>
    </Suspense>
  </Router>
);
export default App;