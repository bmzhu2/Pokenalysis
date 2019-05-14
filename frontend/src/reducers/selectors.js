export const userTeams = (teams, username) => {
    let newTeams = []

    Object.values(teams).forEach(team => {
        if(team.username === username){
            newTeams.push(team)
        }
    })

    return newTeams
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