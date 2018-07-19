const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: String,
    productDescription: String,
    productPrice: Number,
    productQuantity: Number,
    thumbnail: [String]
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
