import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as api_links from '../APILinks';

export const authStart = () => {
    return {
      type: actionTypes.AUTH_START
    }
  }

  export const authSuccess = token => {
    return {
      type: actionTypes.AUTH_SUCCESS,
      token: token
    }
  }

  export const authFail = error => {
    return {
      type: actionTypes.AUTH_FAIL,
      error: error
    }
  }

  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('id');
    return {
      type: actionTypes.AUTH_LOGOUT
    }
  }

  export const authLogin = (username, password) => {
    return dispatch => {
      dispatch(authStart());
      console.log(username, password);
      axios.post(api_links.REST_AUTH_LOGIN, {
        username: username,
        password: password
      })
        .then(res => {
          const userId = res.data.user.id;
          const token = res.data.key;
          //const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          localStorage.setItem('token', token);
          // localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('id', userId);
          dispatch(authSuccess(token));
          // dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
          dispatch(authFail(err))
        });
    }
  }

  export const authCheckState = () => {
    return dispatch => {
      const token = localStorage.getItem('token');
      if (token === undefined) {
        dispatch(logout());
      } else {
        axios.defaults.headers = {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token
        }
        axios.get(api_links.API_ROOT + 'current_user/')
          .then(res => {
            localStorage.setItem('id', res.data[0].id);
            dispatch(authSuccess(token));
          })
          .catch(err => {
            console.log(err);
            dispatch(authFail(err));
          })
      }
    }
  }