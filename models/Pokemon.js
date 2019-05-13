const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  pokeId: {
    type: Number,
    required: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'team'
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
  itemId: {
    type: Number
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

module.exports = User = mongoose.model('users', UserSchema);