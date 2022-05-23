const mongoose = require('mongoose');
const {Schema} = require('mongoose');
// const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    maxlength: 50
  },
  description: {
    type: String,
    maxlength: 200
  },
  images: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  filePath:{
    type:String
  },
  views:{
    type:Number,
    default:0
  },
  duration:{
    type:String
  },
  thumbnail:{
    type:String
  }

});




const Product = mongoose.model('Product', productSchema);

module.exports = { Product };