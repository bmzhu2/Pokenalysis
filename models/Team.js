const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
  pokeId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  move1: {
    type: String
  },
  move2: {
    type: String
  },
  move3: {
    type: String
  },
  move4: {
    type: String
  },
  item: {
    type: String
  },
  ability: {
    type: String
  },
  nature: {
    type: String,
    default: "Hardy"
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const TeamSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  pokemon: [PokemonSchema],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Team = mongoose.model('team', TeamSchema);