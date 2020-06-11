import { connect } from 'react-redux'

import { requestUserData } from '../actions/apiUsersCall'
import UserPage from '../components/UserPage.js'

const mapStateToProps = state => {
  return {
    apiUserData: state.apiUserData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestUserData: url => {
      dispatch(requestUserData(url))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)