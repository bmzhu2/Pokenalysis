

const normal = {
  double_damage_from: ['fighting'],
  half_damage_from: [],
  no_damage_from: ['ghost'],
  double_damage_to: [],
  half_damage_to: ['rock', 'steel'],
  no_damage_to: ['ghost']
}

const fighting = {
  double_damage_from: ['flying', 'psychic', 'fairy'],
  half_damage_from: ['rock', 'bug', 'dark'],
  no_damage_from: [],
  double_damage_to: ['normal', 'rock', 'steel', 'ice', 'dark'],
  half_damage_to: ['flying', 'poison', 'bug', 'psychic', 'fairy'],
  no_damage_to: ['ghost']
}

const flying = {
  double_damage_from: ['rock', 'electric', 'ice'],
  half_damage_from: ['fighting', 'bug', 'grass'],
  no_damage_from: ['ground'],
  double_damage_to: ['fighting', 'bug', 'grass'],
  half_damage_to: ['rock', 'steel', 'electric'],
  no_damage_to: []
}

const poison = {
  double_damage_from: ['ground', 'psychic'],
  half_damage_from: ['fighting', 'poison', 'bug', 'grass', 'fairy'],
  no_damage_from: [],
  double_damage_to: ['grass', 'fairy'],
  half_damage_to: ['poison', 'ground', 'rock', 'ghost'],
  no_damage_to: ['steel']
}

const ground = {
  double_damage_from: ['water', 'grass', 'ice'],
  half_damage_from: ['poison', 'rock'],
  no_damage_from: ['electric'],
  double_damage_to: ['poison', 'rock', 'steel', 'fire', 'electric'],
  half_damage_to: ['bug', 'grass'],
  no_damage_to: ['flying']
}

const rock = {
  double_damage_from: ['fighting', 'ground', 'steel', 'water', 'grass'],
  half_damage_from: ['normal', 'flying', 'poison', 'fire'],
  no_damage_from: [],
  double_damage_to: ['flying', 'bug', 'fire', 'ice'],
  half_damage_to: ['fighting', 'ground', 'steel'],
  no_damage_to: []
}

const bug = {
  double_damage_from: ['flying', 'rock', 'fire'],
  half_damage_from: ['fighting', 'ground', 'grass'],
  no_damage_from: [],
  double_damage_to: ['grass', 'psychic', 'dark'],
  half_damage_to: ['fighting', 'flying', 'poison', 'ghost', 'steel', 'fire', 'fairy'],
  no_damage_to: []
}

const ghost = {
  double_damage_from: ['ghost', 'dark'],
  half_damage_from: ['poison', 'bug'],
  no_damage_from: ['normal', 'fighting'],
  double_damage_to: ['ghost', 'psychic'],
  half_damage_to: ['dark'],
  no_damage_to: ['normal']
}

const steel = {
  double_damage_from: ['fighting', 'ground', 'fire'],
  half_damage_from: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
  no_damage_from: ['poison'],
  double_damage_to: ['rock', 'ice', 'fairy'],
  half_damage_to: ['steel', 'fire', 'water', 'electric'],
  no_damage_to: []
}

const fire = {
  double_damage_from: ['ground', 'rock', 'water'],
  half_damage_from: ['bug', 'steel', 'fire', 'grass', 'ice', 'fairy'],
  no_damage_from: [],
  double_damage_to: ['bug', 'steel', 'grass', 'ice'],
  half_damage_to: ['rock', 'fire', 'water', 'dragon'],
  no_damage_to: []
}

const water = {
  double_damage_from: ['grass', 'electric'],
  half_damage_from: ['steel', 'fire', 'water', 'ice'],
  no_damage_from: [],
  double_damage_to: ['ground', 'rock', 'fire'],
  half_damage_to: ['water', 'grass', 'dragon'],
  no_damage_to: []
}

const grass = {
  double_damage_from: ['flying', 'poison', 'bug', 'fire', 'ice'],
  half_damage_from: ['ground', 'water', 'grass', 'electric'],
  no_damage_from: [],
  double_damage_to: ['ground', 'rock', 'water'],
  half_damage_to: ['flying', 'poison', 'bug', 'steel', 'fire', 'grass', 'dragon'],
  no_damage_to: []
}

const electric = {
  double_damage_from: ['ground'],
  half_damage_from: ['flying', 'steel', 'electric'],
  no_damage_from: [],
  double_damage_to: ['flying', 'water'],
  half_damage_to: ['grass', 'electric', 'dragon'],
  no_damage_to: ['ground']
}

const psychic = {
  double_damage_from: ['bug', 'ghost', 'dark'],
  half_damage_from: ['fighting', 'psychic'],
  no_damage_from: [],
  double_damage_to: ['fighting', 'poison'],
  half_damage_to: ['steel', 'psychic'],
  no_damage_to: ['dark']
}

const ice = {
  double_damage_from: ['fighting', 'rock', 'steel', 'fire'],
  half_damage_from: ['ice'],
  no_damage_from: [],
  double_damage_to: ['flying', 'ground', 'grass', 'dragon'],
  half_damage_to: ['steel', 'fire', 'water', 'ice'],
  no_damage_to: []
}

const dragon = {
  double_damage_from: ['ice', 'dragon', 'fairy'],
  half_damage_from: ['fire', 'water', 'grass', 'electric'],
  no_damage_from: [],
  double_damage_to: ['dragon'],
  half_damage_to: ['steel'],
  no_damage_to: ['fairy']
}

const dark = {
  double_damage_from: ['fighting', 'bug', 'fairy'],
  half_damage_from: ['ghost', 'dark'],
  no_damage_from: ['psychic'],
  double_damage_to: ['ghost', 'psychic'],
  half_damage_to: ['fighting', 'dark', 'fairy'],
  no_damage_to: []
}

const fairy = {
  double_damage_from: ['poison', 'steel'],
  half_damage_from: ['fighting', 'bug', 'dark'],
  no_damage_from: ['dragon'],
  double_damage_to: ['fighting', 'dragon', 'dark'],
  half_damage_to: ['poison', 'steel', 'fire'],
  no_damage_to: []
}