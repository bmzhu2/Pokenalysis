import * as APIUtil from '../util/likes_api_util'

export const RECEIVE_LIKES = 'RECEIVE_LIKES';
export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';

const receiveLikes = (likes) => ({
    type: RECEIVE_LIKES,
    likes
})

const receiveLike = like => ({
    type: RECEIVE_LIKE,
    like
})

const removeLike = likeId => ({
    type: REMOVE_LIKE,
    likeId
})

export const fetchTeamLikes = teamId => dispatch => (
    APIUtil.fetchTeamLikes(teamId)
        .then(likes => dispatch(receiveLikes(likes.data)))
)

export const fetchUserLikes = userId => dispatch => (
    APIUtil.fetchUserLikes(userId)
        .then(likes => dispatch(receiveLikes(likes.data)))
)

export const createLike = teamId => dispatch => (
    APIUtil.createLike(teamId)
        .then(like => dispatch(receiveLike(like.data)))
)

export const deleteLike = likeId => dispatch => (
    APIUtil.deleteLike(likeId)
        .then(likeId => dispatch(removeLike(likeId.data)))
)