import {combineReducers} from 'redux'

import apiCommentsData from './apiCommentsData'
import apiProjectData from './apiProjectData'
import apiUserData from './apiUserData'
import apiBugData from './apiBugData'

const rootReducers = combineReducers({
    apiCommentsData,
    apiProjectData,
    apiUserData,
    apiBugData
})

export default rootReducers