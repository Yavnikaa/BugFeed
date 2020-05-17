import {
    RECEIVE_COMMENTS_DATA,
    COMMENTS_ERROR_OCCURED,
  } from '../actions/apiCommentsCall'
  
  const apiCommentsData = (
    state = { data: null, loaded: false, url: '' },
    action
  ) => {
    switch (action.type) {
      case RECEIVE_COMMENTS_DATA:
        return {
          ...state,
          data: action.data,
          url: action.url,
          loaded: true,
        }
      case COMMENTS_ERROR_OCCURED:
        return {
          ...state,
          url: action.url,
          error: action.error,
        }
      default:
        return state
    }
  }
  
  export default apiCommentsData