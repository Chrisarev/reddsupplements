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
const { storage } = require('./cloudinary')
const upload = multer({ storage }) ///store uploaded images to cloudinary path in storage config 
const session = require('express-session') ///allows us to make HTTP stateful with individual sessions and cookies
const passport = require('passport') ///auth middleware
const LocalStrategy = require('passport-local') ///LOCAL user/pass auth strategy for passport
const User = require('./models/user')
const Cart = require('./models/cart')
const MongoDBStore = require('connect-mongo') ///allows us to store session in mongo
const { isLoggedIn } = require('./middleware')
const { validateUserInfo } = require('./middleware')

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
app.use(express.json({ limit: "50mb" }))
app.use(express.static(path.join(__dirname + '/public')))
app.use(express.urlencoded({ extended: true })) ///allows us to get req.params 
app.use(methodOverride('_method')) ///allows requests other than get/post thru forms 
app.use(mongoSanitize()) ///prevents users from inputting characters that could result in mongo injection

/***************** SESSION CONFIGURATION *****************/
const secret = process.env.SECRET || 'thisshouldbeabettersecret!'

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60 ///lazy update session unless 1 day has passed
});

store.on('error', function (e) {
    console.log('SESSION STORE ERROR:', e)
})

const sessionConfig = {
    store,
    name: '__umli',
    secret, ///used to sign cookies
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, ///cross-site scripting protection
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,  ///expires a week from time created 
        maxAge: 1000 * 60 * 60 * 24 * 7 ///maxAge of cookie is a week
    }
}
app.use(session(sessionConfig))

/***************** PASSPORT CONFIGURATION *****************/
app.use(passport.initialize())
app.use(passport.session()) ///for persistent login sessions

passport.use(new LocalStrategy(User.authenticate())) ///use UserSchema authentication that was plugged into User Schema with passport-local-mongoose
passport.serializeUser(User.serializeUser()) ///tells passport how to store user in session
passport.deserializeUser(User.deserializeUser()) ///tells passport how to remove user from session

/***************** ROUTES *****************/
app.get('/api/category/:category', async (req, res) => {
    console.log('Retrieving all' + req.params.category + ' products.')
    const products = await Product.find({ 'productCategory': req.params.category }).populate();
    res.json(products)
})

app.get('/api/getCart', isLoggedIn, async (req, res) => {
    console.log(req.user.id)
    const cart = await Cart.find({ 'user': req.user.id }).populate();
    console.log('cart: ' + cart);
    res.json(cart)
})

/*
app.post('/api/addCart/:prodID', isLoggedIn, async (req, res) => {
    const { prodID } = req.params;
    try {
        const product = await Product.findById({ _id: prodID });
        const cart = await Cart.find({ 'user': req.user.id }).populate();
        cart.products.push(product);
        await cart.save();
        res.sendStatus(204);
    } catch (e) {
        console.log('Failed to add to cart')
        res.sendStatus(301);
    }
})
*/

app.get('/api/products', async (req, res) => {
    console.log('Retrieving all products.')
    const products = await Product.find({}).populate();
    res.json(products);
})

app.get('/api/product/:prodID', async (req, res) => {
    const { prodID } = req.params;
    console.log('productID: ' + prodID)
    try {
        const product = await Product.findById({ _id: prodID });
        res.json(product);
    } catch (e) {
        console.log('failed')
        res.sendStatus(501)
    }
})

/* adding a new Product */
app.post('/api/addProduct', upload.any(), async (req, res) => {
    const formData = req.body;
    console.log(formData);
    try {
        const newProduct = new Product();
        if (req.files) {
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
    } catch (e) {
        console.log('FAILED!')
        res.sendStatus(301);
    }
})

/* Checking to see if user is logged in */
app.get('/api/sAuth', isLoggedIn, (req, res) => {
    res.sendStatus(204);
})

/* Registering a new User*/
app.post('/api/postUser', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password);
        const cart = new Cart();
        cart.user = user;
        await cart.save();
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.json({ redirectURL: '/', user: username })
        })
    } catch (e) {
        res.json({ redirectURL: 'signup' })
    }
}))

/* attempting to login for existing user */
app.post('/api/login', passport.authenticate('local', { keepSessionInfo: true }), (req, res) => {
    if (!req.user) {
        res.sendStatus(401)
    } else {
        res.json({ user: req.user })
    }
})

/* attempting to logOut for existing user*/
app.post('/api/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {res.json({ attempt: "Failed" })}
        res.json({ attempt: 'Success' })
    })
})

app.post('/api/addCart', async (req, res) => {
    console.log(req.body);
    try {
        const { productQuantity, prodID } = req.body;
        const productNew = await Product.findById({ _id: prodID });
        /* cart has products property which is an array of [product Model, integer quantity] entries */
        /*const data = [productNew.productTitle,productQuantity];  */
        await Cart.findOneAndUpdate({ 'user': req.user.id },
            {
                $push: {
                    products: {
                        productTitle: productNew.productTitle,
                        quantity: productQuantity,
                        productIMG: productNew.image,
                        productPrice: productNew.productPrice
                    }
                }
            }
        )
        const cart = await Cart.find({ 'user': req.user.id }).populate();
        console.log("CART AFTER UPDATE: " + cart);
        res.sendStatus(204);
    } catch (e) {
        console.log('Failed to add to cart')
        res.sendStatus(500);
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving on port: ${PORT}`)
})
