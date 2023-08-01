const mongoose = require('mongoose')
const Schema = mongoose.Schema; 
const { BSON } = require('mongodb');
const { Decimal128 } = require('mongodb');
const Review = require('./review')
const ImageSchema = new Schema({
    url:String
})

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200'); 
})

const ProductSchema = new Schema({
    productTitle:String, 
    productPrice: Decimal128, 
    productPrevPrice:String, 
    productDesc:String,
    productCategory:String, 
    image:String,
    reviews: [ ///array of references to review objects
    {
        type:Schema.Types.ObjectId,
        ref: 'Review'
    }
]
})

///post mongoose middleware that activates AFTER findOneAndDelete middleware is
///executed, which is called when using findByIdAndDelete in app.js 
///post instead of pre so we can access the campground object that findOneAndDelete returns 
ProductSchema.post('findOneAndDelete', async function(deletedProduct){
    if(deletedProduct){ //if a camp has been deleted
        await Review.deleteMany({
            _id: {      
                $in: deletedProduct.reviews
            }//removes all reviews in Review collection that have a _id inside of the deletedCamp.reviews array 
        })
    }
})

module.exports = mongoose.model('Product', ProductSchema); 