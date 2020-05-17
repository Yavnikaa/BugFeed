import axios from 'axios'

export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA'
export const USER_ERROR_OCCURED = 'USER_ERROR_OCCURED'

const requestUserData = url => {
  return dispatch => {
    axios
      .get(`${url}`)
      .then(
        response => dispatch(receiveUserData(url, response)),
        error => dispatch(errorOccured(url, error))
      )
  }
}

const receiveUserData = (url, json) => ({
  type: RECEIVE_USER_DATA,
  data: json.data,
  url,
})

const errorOccured = (url, error) => ({
  type: USER_ERROR_OCCURED,
  url,
  error,
})

export { requestUserData }