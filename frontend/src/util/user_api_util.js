import axios from 'axios'

export const fetchUser = (username) => {
    return axios.get('/api/users/' + username)
}