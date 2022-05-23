const { Schema } = require('mongoose');
const mongoose = require('mongoose');


const scoreSchema = mongoose.Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  game: {
    type: String,
  },
  score: {
    type: Number
  },
  win: {
    type: Number
  },
  time: {
    type: Number
  }

}, { timestamps: true })




const Score = mongoose.model('Score', scoreSchema);

module.exports = { Score }