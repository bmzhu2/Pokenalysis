import axios from  'axios'

export const fetchTeamComments = teamId => {
    return axios.get('/api/comments/team/' + teamId)
}

export const fetchComment = commentId => {
    return axios.get('/api/comments/' + commentId)
}

export const fetchUserComments = userId => {
    return axios.get('api/comments/user/' + userId)
}

export const createComment = comment => {
    return axios.post('api/comments', comment)
}

export const updatecomment = comment => {
    return axios.puts('api/comments/' + comment.id, comment)
}

export const deletecomment = commentId => {
    return axios.delete('api/comments/' + commentId)
}