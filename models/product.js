const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const ImageSchema = new Schema({
    url:String
})

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200'); 
})

const ProductSchema = new Schema({
    productTitle:String, 
    productPrice:String,
    productPrevPrice:String, 
    productDesc:String,
    productCategory:String, 
    image:String
})

module.exports = mongoose.model('Product', ProductSchema); 