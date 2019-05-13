import { RECEIVE_LIKE, RECEIVE_LIKES, REMOVE_LIKE } from '../actions/like_actions'

const likesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LIKE:
            return Object.assign({}, state, { [action.like.id]: action.like })
        case RECEIVE_LIKES:
            return Object.assign({}, state, action.likes)
        case REMOVE_LIKE:
            let newState = Object.assign({}, state);
            delete newState[action.likeId];
            return newState;
        default:
            return state
    }
}

export default likesReducer