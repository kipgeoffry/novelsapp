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
require("./models/connection");
const authRouter = require('./routes/auth');
const novelsRouter = require('./routes/novels');


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(checkUrl);
app.use(session({
    secret:process.env.SESSION_SECRET,
    cookie:{ maxAge: 180000},
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
app.use("/auth",authRouter);
app.use("/novels",novelsRouter);


//set templating engine
app.set('view engine', 'ejs')


app.get('/',(req,res)=>{
    const name = {name:"kigen"}
    res.render('index',{name:name});
});

const users=[
    {
        username:"aron",
        password:123
    },
    {
        username:"kigen",
        password:"456"
    }
];


app.get('/login',userAuth,(req,res)=>{
    res.send(users);
});
//login logic
app.post('/login',async (req,res)=>{
    const { username, password} = req.body;
    if ( username && password){ 
        if(req.session.authenticated && req.session.user == username){
            res.status(200).json({message:"user is already authenticate"})
        }else{
           const user = await users.find((user)=>user.username === username);
           if (!user) return res.status(404).json({message:"User not Found"})
           if (user.username === username & user.password === password){
            req.session.authenticated = true;
            req.session.user = username;
            res.json({message:"User authenticated successfully"})
           } else res.status(401).json({message:"Bad credentials"})          
        }
    }else{
        res.status(400).json({message:"username or password required"})
    }
   
});    

//middleware function to check and log url and method for all routes accessed
function checkUrl(req,res,next){
    console.log(`${req.method}::${req.url}`);
    next();
};



//midleware to check if user is already login
function userAuth(req,res,next){
    if (req.session.authenticated) next()
    else res.status(401).json({message:"user need to login"})
};


//set app's listening port
const port = process.env.PORT || 4510;

//start application
app.listen(port,()=>console.log(`Server is running and listening on ${port}`))


