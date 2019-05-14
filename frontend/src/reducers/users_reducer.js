import { RECEIVE_USER } from '../actions/user_actions'

const usersReducer = (state={}, action) => {
    Object.freeze(state)
    switch(action.type){
        case RECEIVE_USER:
            return Object.assign({}, state, { [action.user.data.username]: action.user.data.userId})
        default:
            return state
    }
}

export default usersReducer