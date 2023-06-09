if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
} ///environment variable that is either in dev or production mode

const express = require('express');
const path = require('path');

const app = express();

app.use(express.json({limit:"50mb"}))
app.use(express.static(path.join(__dirname + '/public')))
app.use(express.urlencoded({ extended: true })) ///allows us to get req.params 

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+ '/public/index.html'))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving on port: ${PORT}`)
})

