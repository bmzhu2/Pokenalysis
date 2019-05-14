import axios from 'axios';

export const spriteAddress = id => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export const fetchPokemon = name => {
  return axios.get('https://pokeapi.co/api/v2/pokemon/' + name)
}

export const fetchManyPokemon = (startIdx = 0) => {
  return axios.get('https://pokeapi.co/api/v2/pokemon?offset=' + startIdx + '&limit=100')
}

export const fetchAllPokemon = () => {
  return axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=896')
}

export const fetchByType = type => {
  return axios.get('https://pokeapi.co/api/v2/type/' + type)
}

export const fetchItem = name => {
  return axios.get('https://pokeapi.co/api/v2/item/' + name)
}

export const fetchItems = () => {
  return axios.get('https://pokeapi.co/api/v2/item?offset=0&limit=954')
}

export const fetchMove = name => {
  return axios.get('https://pokeapi.co/api/v2/move/' + name)
}

export const fetchAbility = name => {
  return axios.get('https://pokeapi.co/api/v2/ability/' + name)
}