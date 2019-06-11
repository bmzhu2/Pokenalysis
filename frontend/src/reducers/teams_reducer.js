import { RECEIVE_TEAM, RECEIVE_TEAMS, REMOVE_TEAM } from '../actions/team_actions'

const teamsReducer = (state={}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_TEAM:
            return Object.assign({}, state, {[action.team._id]: action.team})
        case RECEIVE_TEAMS:
            const newTeams = {}
            action.teams.forEach(team => {
                newTeams[team._id] = team
            })
            return Object.assign({}, state, newTeams)
        case REMOVE_TEAM:
            debugger;
            let newState = Object.assign({}, state);
            delete newState[action.teamId.data];
            return newState;
        default:
            return state
    }
}

export default teamsReducer