import * as PokeAPIUtil from '../util/poke_api_util';

export const RECEIVE_POKEMON = 'RECEIVE_POKEMON';
export const RECEIVE_MANY_POKEMON = 'RECEIVE_MANY_POKEMON';
export const RECEIVE_POKEMON_BY_TYPE = 'RECEIVE_POKEMON_BY_TYPE';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const RECEIVE_MOVE = 'RECEIVE_MOVE';
export const RECEIVE_ABILITY = 'RECEIVE_ABILITY';

const receivePokemon = pokemon => ({
  type: RECEIVE_POKEMON,
  pokemon
})

const receiveManyPokemon = pokemon => ({
  type: RECEIVE_MANY_POKEMON,
  pokemon
})

const receivePokemonByType = pokemon => ({
  type: RECEIVE_POKEMON_BY_TYPE,
  pokemon
})

const receiveItem = item => ({
  type: RECEIVE_ITEM,
  item
})

const receiveItems = item => ({
  type: RECEIVE_ITEMS,
  item
})

const receiveMove = move => ({
  type: RECEIVE_MOVE,
  move
})

const receiveAbility = ability => ({
  type: RECEIVE_ABILITY,
  ability
})

export const fetchPokemon = name => dispatch => (
  PokeAPIUtil.fetchPokemon(name)
    .then(pokemon => dispatch(receivePokemon(pokemon)))
)

export const fetchManyPokemon = startIdx => dispatch => (
  PokeAPIUtil.fetchManyPokemon(startIdx)
    .then(pokemon => dispatch(receiveManyPokemon(pokemon)))
)

export const fetchByType = type => dispatch => (
  PokeAPIUtil.fetchByType(type)
    .then(pokemon => dispatch(receivePokemonByType(pokemon)))
)

export const fetchItem = name => dispatch => (
  PokeAPIUtil.fetchItem(name)
    .then(item => dispatch(receiveItem(item)))
)

export const fetchAllItems = () => dispatch => (
  PokeAPIUtil.fetchAllItems()
    .then(items => dispatch(receiveItems(items)))
)

export const fetchMove = name => dispatch => (
  PokeAPIUtil.fetchMove(name)
    .then(move => dispatch(receiveMove(move)))
)

export const fetchAbility = name => dispatch => (
  PokeAPIUtil.fetchAbility(name)
    .then(ability => dispatch(receiveAbility(ability)))
)