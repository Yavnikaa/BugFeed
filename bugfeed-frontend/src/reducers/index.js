import {combineReducers} from 'redux'

import apiCommentsData from './apiCommentsData'
import apiProjectData from './apiProjectData'
import apiUserData from './apiUserData'
import apiBugData from './apiBugData'
import apiTeamData from './apiTeamData'
import authReducer from './authReducer'

const rootReducers = combineReducers({
    apiCommentsData,
    apiProjectData,
    apiUserData,
    apiBugData,
    apiTeamData,
    authReducer,
})

export default rootReducers