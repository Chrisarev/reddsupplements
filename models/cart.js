const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')
const Product = require('./product')

const CartSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    quantities: [{
        type: Number
    }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Cart', CartSchema); 