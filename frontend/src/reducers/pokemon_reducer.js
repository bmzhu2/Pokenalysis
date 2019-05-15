import { RECEIVE_POKEMON, RECEIVE_MANY_POKEMON, RECEIVE_POKEMON_BY_TYPE } from '../actions/poke_api_actions'

export const idParse = pokemon => {
  let urlSplit = pokemon.url.split("/");
  urlSplit.pop();
  return urlSplit.pop();
};

const pokemonReducer = (state = {}, action) => {
  Object.freeze(state);
  let emptyState = {};
  switch (action.type) {
    case RECEIVE_POKEMON:
      let data = action.pokemon.data
      let typesArr = [];
      data.types.forEach(type => {
        typesArr.push(type.type.name)
      });

      let moves = data.moves.map(idx => {
        return idx.move.name
      })

      let pokemon = {
        id: data.id,
        name: data.name, 
        abilities: data.abilities, 
        moves: moves, 
        sprite: data.sprites.front_default,
        stats: data.stats, 
        types: typesArr
      }
      return Object.assign({}, state, { [data.id]: pokemon })
    case RECEIVE_MANY_POKEMON:
      Object.values(action.pokemon.data.results).forEach(pokemon => {
        let id = idParse(pokemon)
        emptyState[id] = { 
          id: id,
          name: pokemon.name, 
          sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+ id + ".png"}
      })

      return Object.assign({}, state, emptyState)
    case RECEIVE_POKEMON_BY_TYPE:
      Object.values(action.pokemon.data.pokemon).forEach(pokemon => {
        let id = idParse(pokemon.pokemon)
        if (state[id] && state[id].types && !state[id].types.includes(action.pokemon.data.name)) {
          state[id].types.push(action.pokemon.data.name)
        } else {
          emptyState[id] = {
            id: id,
            name: pokemon.pokemon.name,
            sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png",
            types: [action.pokemon.data.name]
          }
        }        
      })

      return Object.assign({}, state, emptyState)
    default:
      return state
  }
}

export default pokemonReducer