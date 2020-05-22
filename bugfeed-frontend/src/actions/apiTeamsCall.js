import axios from 'axios'

export const RECEIVE_TEAM_DATA = 'RECEIVE_TEAM_DATA'
export const TEAM_ERROR_OCCURED = 'TEAM_ERROR_OCCURED'

const requestTeamData = url => {
  return dispatch => {
    axios
      .get(`${url}`)
      .then(
        response => dispatch(receiveTeamData(url, response)),
        error => dispatch(errorOccured(url, error))
      )
  }
}

const receiveTeamData = (url, json) => ({
  type: RECEIVE_TEAM_DATA,
  data: json.data,
  url,
})

const errorOccured = (url, error) => ({
  type: TEAM_ERROR_OCCURED,
  url,
  error,
})

export { requestTeamData }