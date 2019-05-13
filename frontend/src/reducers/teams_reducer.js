import { RECEIVE_TEAM, RECEIVE_TEAMS, REMOVE_TEAM } from '../actions/team_actions'

const teamsReducer = (state={}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_TEAM:
            return Object.assign({}, state, {[action.team.id]: action.team})
        case RECEIVE_TEAMS:
            return Object.assign({}, state, action.teams)
        case REMOVE_TEAM:
            let newState = Object.assign({}, state);
            delete newState[action.teamId];
            return newState;
        default:
            return state
    }
}

export default teamsReducer