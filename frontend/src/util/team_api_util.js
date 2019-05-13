import axios from 'axios'

export const fetchTeams = () => {
    return axios.get('/api/teams/')
}

export const fetchTeam = teamId => {
    return axios.get('/api/teams/' + teamId)
}

export const fetchUserTeams = userId => {
    return axios.get('api/teams/user/' + userId)
}

export const createTeam = team => {
    return axios.post('api/teams', team)
}

export const updateTeam = team => {
    return axios.puts('api/teams/' + team.id, team)
}

export const deleteTeam = teamId => {
    return axios.delete('api/teams/' + teamId)
}