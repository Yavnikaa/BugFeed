import {connect} from 'react-redux'

import {requestProjectData} from '../actions/apiProjectsCall'
import ProjectsPage from '../components/Projects'

const mapStateToProps = state => {
    return{
        apiProjectData : state.apiProjectData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestProjectData : url => {
            dispatch(requestProjectData(url))
        },
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ProjectsPage)