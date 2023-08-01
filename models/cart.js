const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')
const Product = require('./product');
const { BSON } = require('mongodb');
const { Decimal128 } = require('mongodb');

const CartSchema = new Schema({
    products: [{
            productTitle: String,
            quantity:String,
            productIMG: String,
            productPrice: Decimal128
        }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Cart', CartSchema);


/*
const CartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

*/