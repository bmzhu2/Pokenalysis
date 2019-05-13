import axios from 'axios'

export const fetchTeamLikes = teamId => {
    return axios.get('/api/likes/team/' + teamId)
}

export const fetchUserLikes = userId => {
    return axios.get('api/likes/user/' + userId)
}

export const createLike = teamId => {
    return axios.post('api/likes', teamId)
}

export const deleteLike = likeId => {
    return axios.delete('api/likes/' + likeId)
}

export const deleteLike = likeId => dispatch => (
    APIUtil.deleteLike(likeId)
        .then(likeId => dispatch(removeLike(likeId)))
)