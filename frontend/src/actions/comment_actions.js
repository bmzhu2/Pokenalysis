import * as APIUtil from '../util/comment_api_util'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
})

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
})

const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId
})

export const fetchTeamComments = teamId => dispatch => (
    APIUtil.fetchTeamComments(teamId)
        .then(comments => dispatch(receiveComments(comments)))
)

export const fetchComment = (commentId) => dispatch => (
    APIUtil.fetchComment(commentId)
        .then(comment => dispatch(receiveComment(comment)))
)

export const fetchUserComments = userId => dispatch => (
    APIUtil.fetchUserComments(userId)
        .then(comments => dispatch(receiveComments(comments)))
)

export const createComment = comment => dispatch => (
    APIUtil.createComment(comment)
        .then(comment => dispatch(receiveComment(comment)))
)

export const updateComment = comment => dispatch => (
    APIUtil.updateComment(comment)
        .then(comment => dispatch(receiveComment(comment)))
)

export const deleteComment = commentId => dispatch => (APIUtil.deleteComment(commentId)
    .then(commentId => dispatch(removeComment(commentId)))
)