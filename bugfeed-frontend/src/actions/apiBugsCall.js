import axios from 'axios'

export const RECEIVE_BUG_DATA = 'RECEIVE_BUG_DATA'
export const BUG_ERROR_OCCURED = 'BUG_ERROR_OCCURED'

const requestBugData = url => {
  return dispatch => {
    axios
      .all([axios.get(`${url}`), axios.options(`${url}`)])
      .then(
        axios.spread((bugRes, optionsRes) => {
          dispatch(receiveBugData(url, bugRes, optionsRes))
        })
      )
      .catch(error => {
        dispatch(errorOccured(url, error))
      })
  }
}

const receiveBugData = (url, json1, json2) => ({
  type: RECEIVE_BUG_DATA,
  data: json1.data,
  options: json2.data,
  url,
})

const errorOccured = (url, error) => ({
  type: BUG_ERROR_OCCURED,
  url,
  error,
})

export { requestBugData }