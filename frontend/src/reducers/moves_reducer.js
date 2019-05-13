import {RECEIVE_MOVE} from '../actions/poke_api_actions';

const movesReducer = (state = {}, action) => {
  Object.freeze(state);
  let emptyState = {};
  switch (action.type) {
    case RECEIVE_MOVE:
      let data = action.move.data

      let move = {
        accuracy: data.accuracy,
        damage_class: data.damage_class.name,
        effect: data.effect_entries[0].short_effect,
        power: data.power,
        pp: data.pp,
        type: data.type.name
      }

      return Object.assign({}, state, { [data.name]: move })
    
    default:
      return state
  }
}

export default movesReducer