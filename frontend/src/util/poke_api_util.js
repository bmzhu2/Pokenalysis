import axios from 'axios';

export const spriteAddress = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

export const fetchPokemon = id => {
  return axios.get('api/users/register', userData)
};
