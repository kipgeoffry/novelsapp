//import dependecy modules
const express = require('express');
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const logger = require("./src/config/logger");
require('dotenv').config();


// //import local modules
const authRouter = require('./src/routes/auth');
const booksRouter = require('./src/routes/books');
const { errorConverter, errorHandler } = require('./src/middlewares/error');

//initialize app
const app = express();

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
app.use("/api/auth",authRouter);
app.use("/api/books",booksRouter);

//middleware error Handlerrrors
app.use(errorConverter);
app.use(errorHandler);

//middleware function to check and log url and method for all routes accessed
function checkUrl(req,res,next){
    console.log(`${req.method}::${req.url}`);
    next();
};

const PORT = process.env.PORT || 4510;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    logger.info("Database connection established");
    //start application
    app.listen(PORT, () =>
      logger.info(`Application is running and listening on port ${PORT}`)
    );
  })
  .catch((error) => logger.error("Database connection failed ", error));

module.exports = app;


