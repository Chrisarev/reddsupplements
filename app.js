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
const cors = require('cors')

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
app.use(cors())

app.use(express.json({limit:"50mb"}))
app.use(express.static(path.join(__dirname + '/public')))
app.use(express.urlencoded({ extended: true })) ///allows us to get req.params 
app.use(methodOverride('_method')) ///allows requests other than get/post thru forms 
app.use(mongoSanitize()) ///prevents users from inputting characters that could result in mongo injection



app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
  
app.get('/category/:category', async (req,res) =>{
    console.log('Retrieving all' + req.params.category + ' products.')
    const products = await Product.find({'productCategory' : req.params.category}).populate();
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
    console.log(formData);
    try{
        const newProduct = new Product();         
        if(req.files){
            newProduct.image = req.files[0].path; 
        }
        newProduct.productTitle = formData.productTitle;
        newProduct.productDesc = formdata.productDesc;
        newProduct.productCategory = formData.productCategory; 
        newProduct.productPrice = formData.productPrice; 
        newProduct.productPrevPrice = formData.productPrevPrice;
        console.log(newProduct); 
        await newProduct.save(); 
        console.log('POSTED!')
        res.sendStatus(204); 
    }catch (e) {
        console.log('FAILED!')
        res.sendStatus(301);
    }
})

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+ '/public/index.html'))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving on port: ${PORT}`)
})
