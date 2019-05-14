import axios from 'axios'

export const fetchUser = (userId) => {
    debugger;
    return axios.get('/api/users/' + userId)
}