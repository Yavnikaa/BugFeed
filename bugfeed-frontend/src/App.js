import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const Homepage = lazy(() => import('./container-components/Homepage'));
const ProjectsPage = lazy(() => import('./container-components/Projects'));
const AddProject = lazy(() => import ('./components/Newproject'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/projects" component={ProjectsPage}/>
        <Route exact path="/add_project" component={AddProject}/>
      </Switch>
    </Suspense>
  </Router>
);
export default App;
