import {
    RECEIVE_BUG_DATA,
    BUG_ERROR_OCCURED,
  } from '../actions/apiBugsCall'
  
  const apiBugData = (
    state = { data: null, loaded: false, url: '' },
    action
  ) => {
    switch (action.type) {
      case RECEIVE_BUG_DATA:
        return {
          ...state,
          data: action.data,
          url: action.url,
          loaded: true,
        }
      case BUG_ERROR_OCCURED:
        return {
          ...state,
          url: action.url,
          error: action.error,
        }
      default:
        return state
    }
  }
  
  export default apiBugData