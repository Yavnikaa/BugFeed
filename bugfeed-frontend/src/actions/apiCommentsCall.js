import axios from 'axios'

export const RECEIVE_COMMENTS_DATA = 'RECEIVE_COMMENTS_DATA'
export const COMMENTS_ERROR_OCCURED = 'COMMENTS_ERROR_OCCURED'

const requestCommentsData = url => {
  return dispatch => {
    axios
      .get(`${url}`)
      .then(
        response => dispatch(receiveCommentsData(url, response)),
        error => dispatch(errorOccured(url, error))
      )
  }
}

const receiveCommentsData = (url, json) => ({
  type: RECEIVE_COMMENTS_DATA,
  data: json.data,
  url,
})

const errorOccured = (url, error) => ({
  type: COMMENTS_ERROR_OCCURED,
  url,
  error,
})

export { requestCommentsData }