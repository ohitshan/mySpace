const { Schema } = require('mongoose');
const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  responseTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postId:{
    type: Schema.Types.ObjectId,
    ref:'Product'
  },
  content:{
    type:String
  },


}, { timestamps: true })




const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }