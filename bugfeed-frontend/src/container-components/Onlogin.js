import React, { useState, useEffect }  from 'react'
import queryString from 'query-string';
import axios from 'axios';
import { connect } from "react-redux";
import * as actions from '../actions/auth';
import {Link } from 'react-router-dom';
import * as api_links from '../APILinks';
import '../css/onLogin.css'

function Onlogin(props) {
    const [state, setState] = useState({
      user_found: false,
      got_response: false,
    });

    useEffect(() => {
        let url = props.location.search;
        let params = queryString.parse(url);
        console.log(params.code);
    
        axios({
          method: 'POST',
          url: api_links.API_ROOT + 'users/onlogin/',
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          data: {
            code: params.code,
            state: params.state
          }
        })
          .then(res => {
            console.log(res);
            //set access token as token for user authentication
            if (res.status === 201 || res.status === 202) {
              setState({
                user_found: true,
                got_response: true,
              });
              props.onAuth(res.data.username, res.data.access_token);
            } else {
              console.log("Hello", res);
              setState({
                user_found: false,
                got_response: true
              });
              alert("This app is accessible exclusively to members of IMG IIT Roorkee.");
            }
          })
          .catch(err => console.log(err));
      }, []);

      if (state.got_response) {
        if (state.user_found) {
          return (
            <div className="center-container">
              <h6>Welcome to Bugfeed!</h6>
              {setTimeout(() => { window.location.href = '/' }, 2000)}
            </div>
    
          );
        } else {
          return (
            <div className="center-container">
              <Link to='/login'>
                <button>Go to Sign-in Page</button>
              </Link>
            </div>
          );
        }
      } else {
        return (
          <div className="center-container">
            <h4 >Loading...</h4>
          </div>
        );
      }
    
    }

    const mapDispatchToProps = (dispatch) => {
        return {
          onAuth: (username, password) => dispatch(actions.authLogin(username, password))
        }
      }
      
      export default connect(null, mapDispatchToProps)(Onlogin);