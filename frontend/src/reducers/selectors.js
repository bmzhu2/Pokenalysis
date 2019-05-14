export const userTeams = (teams, userId) => {
    let newTeams = []

    Object.values(teams).forEach(team => {
        if(team.user === userId){
            newTeams.push(team)
        }
    })

    return newTeams
}

export const likedTeams = (entities, userId) => {
    let newTeams = [];
    let likes = Object.values(entities.likes)
    likes.forEach(like => {
        if(like.user === userId){
            newTeams.push(entities.teams[like.team])
        }
    })
    return newTeams
}