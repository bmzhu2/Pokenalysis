import {RECEIVE_ITEM, RECEIVE_ITEMS} from '../actions/poke_api_actions';


const itemsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ITEM:
      let data = action.item.data

      let item = {
        name: data.name,
        effect: data.effect_entries[0].short_effect,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" + data.name + ".png"
      }
      return Object.assign({}, state, { [data.id]: item })
    case RECEIVE_ITEMS:
      let itemList = {}
      Object.values(action.item.data.results).forEach(item => {
        itemList[item.name] = {name: item.name}
      })

      return Object.assign({}, state, itemList)
    default:
      return state
  }
}

export default itemsReducer