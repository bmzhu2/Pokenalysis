import { RECEIVE_POKEMON, RECEIVE_MANY_POKEMON, RECEIVE_POKEMON_BY_TYPE } from '../actions/poke_api_actions'

const pokemonReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = state;
  switch (action.type) {
    case RECEIVE_POKEMON:
      let data = action.pokemon.data
      let pokemon = {
        name: data.name, 
        abilities: data.abilities, 
        moves: data.moves, 
        sprite: data.sprites.front_default,
        stats: data.stats, 
        types: data.types
      }
      return Object.assign({}, state, { [data.id]: pokemon })
    case RECEIVE_MANY_POKEMON:
      debugger;
      return Object.assign({}, state, action.teams)
    case RECEIVE_POKEMON_BY_TYPE:
      let newState = state;
      delete newState[action.teamId];
      return newState;
    default:
      return state
  }
}

export default pokemonReducer