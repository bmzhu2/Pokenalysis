import teamsReducer from './teams_reducer'
import { combineReducers } from 'redux'

const entitiesReducer = combineReducers({
    teams: teamsReducer
})

export default entitiesReducer