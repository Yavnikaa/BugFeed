import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Homepage = lazy(() => import('./Homepage'));
const Projects = lazy(() => import('./Projects'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/projects" component={Projects}/>
      </Switch>
    </Suspense>
  </Router>
);
export default App;
