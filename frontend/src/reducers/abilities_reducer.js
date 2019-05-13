import { RECEIVE_ABILITY } from '../actions/poke_api_actions';

const abilityReducer = (state = {}, action) => {
  Object.freeze(state);
  let emptyState = {};
  switch (action.type) {
    case RECEIVE_ABILITY:
      let data = action.ability.data

      return Object.assign({}, state, { [data.name]: data.effect_entries[0].short_effect })

    default:
      return state
  }
}

export default abilityReducer