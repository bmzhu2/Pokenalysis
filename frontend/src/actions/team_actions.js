import * as APIUtil from '../util/team_api_util'

export const RECEIVE_TEAMS = 'RECEIVE_TEAMS';
export const RECEIVE_TEAM = 'RECEIVE_TEAM';
export const REMOVE_TEAM = 'REMOVE_TEAM';

const receiveTeams = (teams) => ({
    type: RECEIVE_TEAMS,
    teams
})

const receiveTeam = team => ({
    type: RECEIVE_TEAM,
    team
})

const removeTeam = teamId => ({
    type: REMOVE_TEAM,
    teamId
})

export const fetchTeams = () => dispatch => (
    APIUtil.fetchTeams()
        .then(teams => dispatch(receiveTeams(teams)))
)

export const fetchTeam = (teamId) => dispatch => (
    APIUtil.fetchTeam(teamId)
        .then(team => dispatch(receiveTeam(team)))
)

export const fetchUserTeams = userId => dispatch => (
    APIUtil.fetchUserTeams(userId)
        .then(teams  => dispatch(receiveTeams(teams)))
)

export const createTeam = team => dispatch => (
    APIUtil.createTeam(team)
        .then(team => dispatch(receiveTeam(team)))
)

export const updateTeam = team => dispatch => (
    APIUtil.updateTeam(team)
        .then(team => dispatch(receiveTeam(team)))
)

export const deleteTeam = teamId => dispatch => (    APIUtil.deleteTeam(teamId)
        .then(teamId => dispatch(removeTeam(teamId)))
)