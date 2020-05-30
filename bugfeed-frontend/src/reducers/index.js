import {combineReducers} from 'redux'

import apiCommentsData from './apiCommentsData'
import apiProjectData from './apiProjectData'
import apiUserData from './apiUserData'
import apiBugData from './apiBugData'
import apiTeamData from './apiTeamData'

const rootReducers = combineReducers({
    apiCommentsData,
    apiProjectData,
    apiUserData,
    apiBugData,
    apiTeamData
})

export default rootReducers