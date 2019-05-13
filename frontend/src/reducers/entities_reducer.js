import teamsReducer from './teams_reducer'
import { combineReducers } from 'redux'
import commentsReducer from './comments_reducer'

const entitiesReducer = combineReducers({
    teams: teamsReducer,
    comments: commentsReducer
})

export default entitiesReducer