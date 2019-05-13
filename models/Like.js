const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  team: {
    type: String,
    ref: 'team'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Like = mongoose.model('like', LikeSchema);