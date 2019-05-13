import * as APIUtil from '../util/like_api_util'

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
        .then(likes => dispatch(receiveLikes(likes)))
)

export const fetchUserLikes = userId => dispatch => (
    APIUtil.fetchUserLikes(userId)
        .then(likes => dispatch(receiveLikes(likes)))
)

export const createLike = teamId => dispatch => (
    APIUtil.createLike(teamId)
        .then(like => dispatch(receiveLike(like)))
)