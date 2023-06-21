if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
} ///environment variable that is either in dev or production mode

const express = require('express')
const path = require('path')
const mongoose = require('mongoose') ///for connecting to mongoDB
const methodOverride = require('method-override') ///allows http verbs other than POST/GET in forms
const mongoSanitize = require('express-mongo-sanitize') ///prevents mongo injection
const Product = require('./models/product') 
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const multer = require('multer'); ///require multer to parse images sent in forms 
const {storage} = require('./cloudinary')
const upload = multer({storage}) ///store uploaded images to cloudinary path in storage config 
const cors = require('cors')
const session = require('express-session') ///allows us to make HTTP stateful with individual sessions and cookies
const passport = require('passport') ///auth middleware
const LocalStrategy = require('passport-local') ///LOCAL user/pass auth strategy for passport
const User = require('./models/user') 
const MongoDBStore = require('connect-mongo') ///allows us to store session in mongo
const { isLoggedIn } = require('./middleware')
const {validateUserInfo} = require('./middleware')

/***************** DATABASE CONFIG *****************/
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


/***************** MIDDLEWARE CONFIG *****************/
const app = express()
app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use(express.static(path.join(__dirname + '/public')))
app.use(express.urlencoded({ extended: true })) ///allows us to get req.params 
app.use(methodOverride('_method')) ///allows requests other than get/post thru forms 
app.use(mongoSanitize()) ///prevents users from inputting characters that could result in mongo injection

/***************** SESSION CONFIGURATION *****************/ 
const secret = process.env.SECRET || 'thisshouldbeabettersecret!'

const store = MongoDBStore.create({
    mongoUrl:dbUrl,
    secret,
    touchAfter: 24 * 60 * 60 ///lazy update session unless 1 day has passed
});

store.on('error', function(e){
    console.log('SESSION STORE ERROR:', e)
})

const sessionConfig = { 
    store, 
    name:'__umli', 
    secret, ///used to sign cookies
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true, ///cross-site scripting protection
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,  ///expires a week from time created 
        maxAge: 1000 * 60 * 60 * 24 * 7 ///maxAge of cookie is a week
    }
}
app.use(session(sessionConfig))

/***************** PASSPORT CONFIGURATION *****************/ 
app.use(passport.initialize())
app.use(passport.session()) ///for persistent login sessions
passport.use(new LocalStrategy(User.authenticate())) ///use UserSchema authentication that was plugged into User Schema with passport-local-mongoose
passport.deserializeUser(User.deserializeUser()) 

/*
app.use((req,res,next) =>{
    res.locals.currentUser = req.user; ///gives access to the current user in all templates
    next()
})
*/

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
  

/***************** ROUTES *****************/ 
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

app.get('/product/:prodID', async (req,res) =>{
    const productID = req.params.prodID;
    const product = new Product(); 
    try{
     product = await Product.findById({_id: productID}); 
     res.json(product);
    } catch (e) {
        console.log('failed') 
        res.sendStatus(301)
    }})

app.get('/getCart', async (req,res) =>{
    res.sendStatus(203);
})

/* adding a new Product */
app.post('/addProduct', upload.any(), async (req,res) =>{
    const formData = req.body; 
    console.log(formData);
    try{
        const newProduct = new Product();         
        if(req.files){
            newProduct.image = req.files[0].path; 
        }
        newProduct.productTitle = formData.productTitle;
        newProduct.productDesc = formData.productDesc;
        newProduct.productCategory = formData.productCategory; 
        newProduct.productPrice = formData.productPrice; 
        newProduct.productPrevPrice = formData.productPrevPrice;
        console.log('trying 3!')
        await newProduct.save(); 
        console.log('POSTED!')
        res.sendStatus(204); 
    }catch (e) {
        console.log('FAILED!')
        res.sendStatus(301);
    }
})

/* Checking to see if user is logged in */
app.get('isAuth', isLoggedIn, (req,res) =>{
    res.sendStatus(204);
})

/* Registering a new User*/
app.post('/postUser', catchAsync(async (req,res) =>{
    try{
        const {email, username, password} = req.body; 
        const user = new User({email,username})
        const registeredUser = await User.register(user,password);
        req.login(registeredUser , err =>{
            if(err) return next(err);
            res.json({redirectURL:'/', user: username})
        })
    } catch (e) {
        res.json({redirectURL: 'signup'})
    }
}))

/* attempting to login for existing user */
app.post('/login', passport.authenticate('local',{ keepSessionInfo:true}), (req,res) =>{
    if (!req.user) {
        res.sendStatus(401)
    }else {
        res.json({user:req.user})
    }
})

/* attempting to logOut for existing user*/
app.post('/logout', (req,res) =>{
    req.logout(function (err) {
        if (err) {res.json({attempt:"Failed"})}
        res.json({attempt:'Success'})
    })
})

app.get('/cart/:userID', isLoggedIn, (req,res) =>{
    res.sendStatus(204);
})

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+ '/public/index.html'))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving on port: ${PORT}`)
})
