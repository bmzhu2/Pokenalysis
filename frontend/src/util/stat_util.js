export const parseStats = statsArray => {
    let parsedStats = {};
    statsArray.forEach(stat => {
        parsedStats[stat.stat.name] = stat.base_stat;
    })
    let statTotal = 0;
    Object.values(parsedStats).forEach(statVal => {
        statTotal += statVal
    })
    parsedStats['statTotal'] = statTotal;
}

const extractStats = (team, pokemon) => {
    let pokeStats = [];

    team.pokemon.forEach(mon => {
        let stats = pokemon[mon].stats;
        stats = parseStats(stats);
        pokeStats.push(stats);
    })

    return pokeStats
}

export const averageStats = (team, pokemon) => {
    
}