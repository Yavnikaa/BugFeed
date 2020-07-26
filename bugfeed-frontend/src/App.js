import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './Routes';
import * as actions from './actions/auth';



const App = (props) => {

  React.useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  return (
    <Router>
    <BaseRouter />
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);