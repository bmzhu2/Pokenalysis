import {connect} from 'react-redux'
import PokemonAttributes from './pokemon_attributes'
import {fetchPokemon, fetchMove, fetchItem, fetchAbility} from '../../actions/poke_api_actions'

const mapStateToProps = state => ({
  pokemon: state.entities.pokemon,
  moves: state.entities.moves,
  items: state.entities.items,
  abilities: state.entities.abilities
})

const mapDispatchToProps = dispatch => ({
  fetchPokemon: name => dispatch(fetchPokemon(name)),
  fetchMove: name => dispatch(fetchMove(name)),
  fetchItem: name => dispatch(fetchItem(name)),
  fetchAbility: name => dispatch(fetchAbility(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(PokemonAttributes)