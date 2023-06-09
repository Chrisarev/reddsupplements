if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
} ///environment variable that is either in dev or production mode

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const mongoSanitize = require('express-mongo-sanitize')
const Product = require('./models/product')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const multer = require('multer'); ///require multer to parse images sent in forms 
const {storage} = require('./cloudinary')
const upload = multer({storage}) ///store uploaded images to cloudinary path in storage config 


///THIS NEEDS TO BE SET TO DEPLOY 
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});///creates db yelp-camp(or connects to it if already made)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected")
});///checks to see if connected and handles db connection error

const app = express()

app.use(express.json({limit:"50mb"}))
app.use(express.static(path.join(__dirname + '/public')))
app.use(express.urlencoded({ extended: true })) ///allows us to get req.params 
app.use(methodOverride('_method')) ///allows requests other than get/post thru forms 
app.use(mongoSanitize()) ///prevents users from inputting characters that could result in mongo injection


app.get('/category/:category', async (req,res) =>{
    console.log('Retrieving all' + req.params.category + ' products.')
    const products = await Product.find({'category' : req.params.category}).populate();
    res.json(products)
})

app.get('/products', async (req,res) =>{
    console.log('Retrieving all products.')
    const products = await Product.find({}).populate(); 
    res.json(products); 
})

app.get('/getCart', async (req,res) =>{
    res.sendStatus(203);
})

app.post('/addProduct', upload.any(), async (req,res) =>{
    const formData = req.body; 
    try{
        const newProduct = new Product();         
        if(req.files){
            newProduct.image = req.files[0].path; 
        }else{
            console.log('Multer image upload failed')
        }
        newProduct.productTitle = formData.productTitle;
        newProduct.productDesc = formdata.productDesc;
        newProduct.productCategory = formData.productCategory; 
        newProduct.productPrice = formData.productPrice; 
        newProduct.productPrevPrice = formData.productPrevPrice;
        await newProduct.save(); 
        res.sendStatus(204); 
    }catch (e) {
        res.sendStatus(401);
    }
})


app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+ '/public/index.html'))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving on port: ${PORT}`)
})
