import teamsReducer from './teams_reducer'
import pokemonReducer from './pokemon_reducer'
import { combineReducers } from 'redux'
import commentsReducer from './comments_reducer'
import likesReducer from './likes_reducer';

const entitiesReducer = combineReducers({
    teams: teamsReducer,
    pokemon: pokemonReducer,
    comments: commentsReducer,
    likes: likesReducer
})

export default entitiesReducer