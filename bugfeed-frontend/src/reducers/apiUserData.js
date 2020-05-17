import {
    RECEIVE_USER_DATA,
    USER_ERROR_OCCURED,
  } from '../actions/apiUsersCall'
  
  const apiUserData = (
    state = { data: null, loaded: false, url: '', count: 0 },
    action
  ) => {
    switch (action.type) {
      case RECEIVE_USER_DATA:
        return {
          ...state,
          data: action.data,
          url: action.url,
          count: Math.ceil(action.data.count / 16),
          loaded: true,
        }
      case USER_ERROR_OCCURED:
        return {
          ...state,
          url: action.url,
          error: action.error,
        }
      default:
        return state
    }
  }
  
  export default apiUserData