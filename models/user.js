const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    cart: [ ///array of references to review objects
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

UserSchema.plugin(passportLocalMongoose);
///adds unique username,salt, and hashed password properties as well as additional methods

module.exports = mongoose.model('User', UserSchema);