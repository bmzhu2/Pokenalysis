export const types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel',
                'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];

export const teamMoveClassAnalysis = (team, moveList) => {
  let physicalMoves = 0;
  let specialMoves = 0;
  debugger
  team.pokemon.forEach(pokemon => {
    if (moveList[pokemon.move1] && moveList[pokemon.move1].damage_class === "physical") {
      physicalMoves += 1
    } else if (moveList[pokemon.move1] && moveList[pokemon.move1].damage_class === "special") {
      specialMoves += 1
    }
    if (moveList[pokemon.move2] && moveList[pokemon.move2].damage_class === "physical") {
      physicalMoves += 1
    } else if (moveList[pokemon.move2] && moveList[pokemon.move2].damage_class === "special") {
      specialMoves += 1
    }
    if (moveList[pokemon.move3] && moveList[pokemon.move3].damage_class === "physical") {
      physicalMoves += 1
    } else if (moveList[pokemon.move3] && moveList[pokemon.move3].damage_class === "special") {
      specialMoves += 1
    }
    if (moveList[pokemon.move4] && moveList[pokemon.move4].damage_class === "physical") {
      physicalMoves += 1
    } else if (moveList[pokemon.move4] && moveList[pokemon.move4].damage_class === "special") {
      specialMoves += 1
    }
  })

  return {physical: physicalMoves, special: specialMoves}
};

export const teamOffensiveCoverage = (team, moveList) => {
  let totalCoverage = {}
  team.pokemon.forEach(pokemon => {
    let coverage = pokemonCoverageAnalysis(pokemon, moveList)
    types.forEach(type => {
      totalCoverage[type] += coverage[type]
    })
  })

  types.forEach(type => {
    totalCoverage[type] /= 6
  })

  return totalCoverage;
}

const pokemonCoverageAnalysis = (pokemon, moveList, pokeList) => {
  let moveTypes = [];
  if (moveList[pokemon.move1].damage_class !== "status" && !moveTypes.includes(moveList[pokemon.move1].type)) {
    moveTypes.push(pokemon.move1.type)
  }
  if (moveList[pokemon.move2].damage_class !== "status" && !moveTypes.includes(moveList[pokemon.move2].type)) {
    moveTypes.push(pokemon.move2.type)
  }
  if (moveList[pokemon.move3].damage_class !== "status" && !moveTypes.includes(moveList[pokemon.move3].type)) {
    moveTypes.push(pokemon.move3.type)
  }
  if (moveList[pokemon.move4].damage_class !== "status" && !moveTypes.includes(moveList[pokemon.move4].type)) {
    moveTypes.push(pokemon.move4.type)
  }

  let totalCoverage = {};
  types.forEach(type => {
    let coverage = 0;
    moveTypes.forEach(moveType => {
      let stab = pokeList[pokemon.pokeId].types.includes(moveType) ? 1 : 0
      if (coverage < 6 || damageRelations[type].double_damage_from.includes(moveType)) {
        coverage[type] = 5 + stab;
      } else if (coverage < 2 && damageRelations[type].half_damage_from.includes(moveType)) {
        coverage[type] = 1 + stab;
      } else if (coverage < 1 && damageRelations[type].no_damage_from.includes(moveType)) {
        coverage[type] = 0;
      } else if (coverage < 4) {
        coverage = 3 + stab;
      }
    })

    totalCoverage[type].push(coverage);
  })

  return totalCoverage
}

export const teamDefensiveCoverage = (team, pokeList) => {
  let defensiveCoverage = {};
  let unchecked = new Set(types);
  types.forEach(type => {
    defensiveCoverage[type] = 0;
  })
  
  team.pokemon.forEach(pokemon => {
    if (pokemon.pokeId && pokeList[pokemon.pokeId].types) {
      const type1 = pokeList[pokemon.pokeId].types[0];
      const type2 = pokeList[pokemon.pokeId].types[1];
      let damageRelation;
      if (!type2) {
        damageRelation = damageRelations[type1]
      } else {
        damageRelation = dualTypeDamageTakenRelation(type1, type2)
      }
      types.forEach(type => {
        if (type2 && damageRelation.quad_damage_from.includes(type)) {
          defensiveCoverage[type] -= 1
        } else if (damageRelation.double_damage_from.includes(type)) {
          defensiveCoverage[type] -= .75
        } else if (damageRelation.half_damage_from.includes(type)) {
          defensiveCoverage[type] += .5
          unchecked.has(type) ? unchecked.delete(type) : null
        } else if (type2 && damageRelation.fourth_damage_from.includes(type)) {
          defensiveCoverage[type] += .75
          unchecked.has(type) ? unchecked.delete(type) : null
        } else if (damageRelation.no_damage_from.includes(type)) {
          defensiveCoverage[type] += 1.5
          unchecked.has(type) ? unchecked.delete(type) : null
        } else {
          defensiveCoverage[type] -= -.25
        }
      })
    }
  })
  return { coverage: defensiveCoverage, unchecked: unchecked }
}

const dualTypeDamageTakenRelation = (type1, type2) => {
  let relation = {
    quad_damage_from: [],
    double_damage_from: [],
    half_damage_from: [],
    fourth_damage_from: [],
    no_damage_from: []
  }

  types.forEach(moveType => {
    switch (dualTypeDamageTaken(type1, type2, moveType)) {
      case "no damage":
        relation.no_damage_from.push(moveType);
        break;
      case "one-fourth damage":
        relation.fourth_damage_from.push(moveType);
        break;
      case "four-times damage":
        relation.quad_damage_from.push(moveType);
        break;
      case "half damage":
        relation.half_damage_from.push(moveType);
        break;
      case "double damage":
        relation.double_damage_from.push(moveType);
        break;
      default:
        break;
    }
  });

  return relation;
}

const dualTypeDamageTaken = (type1, type2, moveType) => {
  const type1Dmg = damageRelations[type1];
  const type2Dmg = damageRelations[type2];

  if (type1Dmg.no_damage_from.includes(moveType) || type2Dmg.no_damage_from.includes(moveType)) {
    return "no damage";
  } else if (type1Dmg.half_damage_from.includes(moveType) && (type2Dmg.half_damage_from.includes(moveType))) {
    return "one-fourth damage";
  } else if (type1Dmg.double_damage_from.includes(moveType) && (type2Dmg.double_damage_from.includes(moveType))) {
    return "four-times damage";
  } else if ((type1Dmg.half_damage_from.includes(moveType) && !type2Dmg.double_damage_from.includes(moveType))
      || (type2Dmg.half_damage_from.includes(moveType) && !type1Dmg.double_damage_from.includes(moveType))) {
    return "half damage";
  } else if ((type1Dmg.double_damage_from.includes(moveType) && !type2Dmg.half_damage_from.includes(moveType))
      || (type2Dmg.double_damage_from.includes(moveType) && !type1Dmg.half_damage_from.includes(moveType))) {
    return "double damage";
  } else {
    return "neutral damage";
  }
}

const damageRelations = {
  normal: {
    double_damage_from: ['fighting'],
    half_damage_from: [],
    no_damage_from: ['ghost'],
    double_damage_to: [],
    half_damage_to: ['rock', 'steel'],
    no_damage_to: ['ghost']
  },

  fighting: {
    double_damage_from: ['flying', 'psychic', 'fairy'],
    half_damage_from: ['rock', 'bug', 'dark'],
    no_damage_from: [],
    double_damage_to: ['normal', 'rock', 'steel', 'ice', 'dark'],
    half_damage_to: ['flying', 'poison', 'bug', 'psychic', 'fairy'],
    no_damage_to: ['ghost']
  },

  flying: {
    double_damage_from: ['rock', 'electric', 'ice'],
    half_damage_from: ['fighting', 'bug', 'grass'],
    no_damage_from: ['ground'],
    double_damage_to: ['fighting', 'bug', 'grass'],
    half_damage_to: ['rock', 'steel', 'electric'],
    no_damage_to: []
  },

  poison: {
    double_damage_from: ['ground', 'psychic'],
    half_damage_from: ['fighting', 'poison', 'bug', 'grass', 'fairy'],
    no_damage_from: [],
    double_damage_to: ['grass', 'fairy'],
    half_damage_to: ['poison', 'ground', 'rock', 'ghost'],
    no_damage_to: ['steel']
  },

  ground: {
    double_damage_from: ['water', 'grass', 'ice'],
    half_damage_from: ['poison', 'rock'],
    no_damage_from: ['electric'],
    double_damage_to: ['poison', 'rock', 'steel', 'fire', 'electric'],
    half_damage_to: ['bug', 'grass'],
    no_damage_to: ['flying']
  },

  rock: {
    double_damage_from: ['fighting', 'ground', 'steel', 'water', 'grass'],
    half_damage_from: ['normal', 'flying', 'poison', 'fire'],
    no_damage_from: [],
    double_damage_to: ['flying', 'bug', 'fire', 'ice'],
    half_damage_to: ['fighting', 'ground', 'steel'],
    no_damage_to: []
  },

  bug: {
    double_damage_from: ['flying', 'rock', 'fire'],
    half_damage_from: ['fighting', 'ground', 'grass'],
    no_damage_from: [],
    double_damage_to: ['grass', 'psychic', 'dark'],
    half_damage_to: ['fighting', 'flying', 'poison', 'ghost', 'steel', 'fire', 'fairy'],
    no_damage_to: []
  },

  ghost: {
    double_damage_from: ['ghost', 'dark'],
    half_damage_from: ['poison', 'bug'],
    no_damage_from: ['normal', 'fighting'],
    double_damage_to: ['ghost', 'psychic'],
    half_damage_to: ['dark'],
    no_damage_to: ['normal']
  },

  steel: {
    double_damage_from: ['fighting', 'ground', 'fire'],
    half_damage_from: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
    no_damage_from: ['poison'],
    double_damage_to: ['rock', 'ice', 'fairy'],
    half_damage_to: ['steel', 'fire', 'water', 'electric'],
    no_damage_to: []
  },

  fire: {
    double_damage_from: ['ground', 'rock', 'water'],
    half_damage_from: ['bug', 'steel', 'fire', 'grass', 'ice', 'fairy'],
    no_damage_from: [],
    double_damage_to: ['bug', 'steel', 'grass', 'ice'],
    half_damage_to: ['rock', 'fire', 'water', 'dragon'],
    no_damage_to: []
  },

  water: {
    double_damage_from: ['grass', 'electric'],
    half_damage_from: ['steel', 'fire', 'water', 'ice'],
    no_damage_from: [],
    double_damage_to: ['ground', 'rock', 'fire'],
    half_damage_to: ['water', 'grass', 'dragon'],
    no_damage_to: []
  },

  grass: {
    double_damage_from: ['flying', 'poison', 'bug', 'fire', 'ice'],
    half_damage_from: ['ground', 'water', 'grass', 'electric'],
    no_damage_from: [],
    double_damage_to: ['ground', 'rock', 'water'],
    half_damage_to: ['flying', 'poison', 'bug', 'steel', 'fire', 'grass', 'dragon'],
    no_damage_to: []
  },

  electric: {
    double_damage_from: ['ground'],
    half_damage_from: ['flying', 'steel', 'electric'],
    no_damage_from: [],
    double_damage_to: ['flying', 'water'],
    half_damage_to: ['grass', 'electric', 'dragon'],
    no_damage_to: ['ground']
  },

  psychic: {
    double_damage_from: ['bug', 'ghost', 'dark'],
    half_damage_from: ['fighting', 'psychic'],
    no_damage_from: [],
    double_damage_to: ['fighting', 'poison'],
    half_damage_to: ['steel', 'psychic'],
    no_damage_to: ['dark']
  },

  ice: {
    double_damage_from: ['fighting', 'rock', 'steel', 'fire'],
    half_damage_from: ['ice'],
    no_damage_from: [],
    double_damage_to: ['flying', 'ground', 'grass', 'dragon'],
    half_damage_to: ['steel', 'fire', 'water', 'ice'],
    no_damage_to: []
  },

  dragon: {
    double_damage_from: ['ice', 'dragon', 'fairy'],
    half_damage_from: ['fire', 'water', 'grass', 'electric'],
    no_damage_from: [],
    double_damage_to: ['dragon'],
    half_damage_to: ['steel'],
    no_damage_to: ['fairy']
  },

  dark: {
    double_damage_from: ['fighting', 'bug', 'fairy'],
    half_damage_from: ['ghost', 'dark'],
    no_damage_from: ['psychic'],
    double_damage_to: ['ghost', 'psychic'],
    half_damage_to: ['fighting', 'dark', 'fairy'],
    no_damage_to: []
  },

  fairy: {
    double_damage_from: ['poison', 'steel'],
    half_damage_from: ['fighting', 'bug', 'dark'],
    no_damage_from: ['dragon'],
    double_damage_to: ['fighting', 'dragon', 'dark'],
    half_damage_to: ['poison', 'steel', 'fire'],
    no_damage_to: []
  }
}