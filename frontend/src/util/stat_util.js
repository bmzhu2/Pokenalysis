export const parseStats = statsArray => {
    let parsedStats = {};
    statsArray.forEach(stat => {
        parsedStats[stat.stat.name] = stat.base_stat;
    })
    let statTotal = 0;
    Object.values(parsedStats).forEach(statVal => {
        statTotal += statVal
    })
    parsedStats['stat-total'] = statTotal;
    return parsedStats
}

const extractStats = (team, pokemon) => {
    let pokeStats = [];
    team.pokemon.forEach(mon => {
        if (pokemon[mon.pokeId].stats){
            let stats = pokemon[mon.pokeId].stats;
            stats = parseStats(stats);
            pokeStats.push(stats);
        }
    })

    return pokeStats
}

export const averageStats = (team, pokemon) => {
    let teamStats = extractStats(team, pokemon);

    const statNames = ['speed', 'defense', 'attack', 'special-attack', 'special-defense', 'hp', 'stat-total']

    let averages = {}

    statNames.forEach(stat=> {
        let average = 0;
        teamStats.forEach(mon => {
            average += mon[stat];
        })
        average = average/teamStats.length;
        averages[stat] = average
    })

    return averages
}