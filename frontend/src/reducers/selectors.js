export const userTeams = (teams, username) => {
    let newTeams = []

    Object.values(teams).forEach(team => {
        if(team.username === username){
            newTeams.push(team)
        }
    })

    return newTeams
}

export const userLikes = (likes, username) => {
    let newLikes = [];
    let likes = Object.values(likes)
    likes.forEach(like => {
        if (like.username === username) {
            newLikes.push(like)
        }
    })
    return newLikes
}

export const likedTeams = (entities, username) => {
    let newTeams = [];
    let likes = Object.values(entities.likes)
    likes.forEach(like => {
        if(like.username === username){
            newTeams.push(entities.teams[like.team])
        }
    })
    return newTeams
}

export const teamLikes = (entities, teamId) => {
    let newLikes = [];
    let likes = Object.values(entities.likes)
    likes.forEach(like => {
        if (like.teamId === teamId) {
            newLikes.push(like)
        }
    })
    return newLikes
}

export const teamComments = (entities, teamId) => {
    let newComments = [];
    let comments = entities.comments;
    Object.values(comments).forEach(comment => {
        if(comment.team == teamId){
            newComments.push(comment)
        }
    })
    return newComments
}

export const userLikes = (entities, username) => {
    let newLikes = [];
    let likes = Object.values(entities.likes)
    likes.forEach(like => {
        if (like.teamId === teamId) {
            newLikes.push(like)
        }
    })
    return newLikes
}