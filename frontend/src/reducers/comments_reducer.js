import { RECEIVE_COMMENT, RECEIVE_COMMENTS, REMOVE_COMMENT } from '../actions/comment_actions'

const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_COMMENT:
            return Object.assign({}, state, { [action.comment._id]: action.comment })
        case RECEIVE_COMMENTS:
            const newComments = {}
            action.comments.forEach(comment => {
                newComments[comment._id] = comment
            })
            return Object.assign({}, state, newComments)
        case REMOVE_COMMENT:
            let newState = Object.assign({}, state);
            delete newState[action.commentId];
            return newState;
        default:
            return state
    }
}

export default commentsReducer