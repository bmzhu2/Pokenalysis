import teamsReducer from './teams_reducer'
import pokemonReducer from './pokemon_reducer'
import movesReducer from './moves_reducer'
import itemsReducer from './items_reducer'
import abilitiesReducer from './abilities_reducer'
import { combineReducers } from 'redux'
import commentsReducer from './comments_reducer'
import likesReducer from './likes_reducer';

const entitiesReducer = combineReducers({
    teams: teamsReducer,
    pokemon: pokemonReducer,
    moves: movesReducer,
    items: itemsReducer,
    abilities: abilitiesReducer,
    comments: commentsReducer,
    likes: likesReducer
})

export default entitiesReducer