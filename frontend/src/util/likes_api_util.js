import axios from 'axios'

export const fetchLikes = () => {
    return axios.get('/api/likes/')
}

export const fetchTeamLikes = teamId => {
    return axios.get('/api/likes/team/' + teamId)
}

export const fetchUserLikes = userId => {
    return axios.get('api/likes/user/' + userId)
}

export const createLike = teamId => {
    return axios.post('api/likes', {teamId: teamId})
}

export const deleteLike = likeId => {
    return axios.delete('api/likes/' + likeId)
}
