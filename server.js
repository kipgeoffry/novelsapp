//import dependecy modules
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const MongoStore = require('connect-mongo');
require('dotenv').config();


//initialize app
const app = express();

//import local modules
require("./config/dbConnection");
const auth = require('./routes/auth');
const booksRouter = require('./routes/books')


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(checkUrl);
app.use(session({
    secret:process.env.SESSION_SECRET,
    cookie:{ maxAge: 1800000}, 
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//routes to controllers
app.use("/api/auth",auth.router);
app.use("/api/books",booksRouter);

//middleware function to check and log url and method for all routes accessed
function checkUrl(req,res,next){
    console.log(`${req.method}::${req.url}`);
    next();
};

//set app's listening port
const PORT = process.env.PORT || 4510;

//start application
app.listen(PORT,()=>console.log(`Server is running and listening on ${PORT}`))


