import teamsReducer from './teams_reducer'
import pokemonReducer from './pokemon_reducer'
import { combineReducers } from 'redux'

const entitiesReducer = combineReducers({
    teams: teamsReducer,
    pokemon: pokemonReducer
})

export default entitiesReducer