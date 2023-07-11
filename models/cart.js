const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')
const Product = require('./product')

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