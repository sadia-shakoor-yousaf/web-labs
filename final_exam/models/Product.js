const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  collab: String,
  description: String,
  price: Number,
  imageDefault: String,
  imageHover: String,
  sizes: [String]
});

module.exports = mongoose.model('Product', productSchema);
