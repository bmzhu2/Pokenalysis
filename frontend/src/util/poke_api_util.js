import axios from 'axios';

export const spriteAddress = id => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export const fetchPokemon = id => {
  return axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
}

export const fetchAllPokemon = () => {
  return axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=964')
}

export const fetchMove = name => {
  return axios.get('https://pokeapi.co/api/v2/move/' + name)
}

export const fetchAbility = name => {
  return axios.get('https://pokeapi.co/api/v2/ability/' + name)
}