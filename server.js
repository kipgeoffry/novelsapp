//import dependecy modules
const { render } = require('ejs');
const express = require('express');
require('dotenv').config();
const session = require('express-session');
const mongoose = require('mongoose');
require("./models/connection");

//initialize app
const app = express();

//import local modules
const authRouter = require('./routes/auth');

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(checkUrl);
app.use(session({
    secret:"adsfhdfuiyijdsfhjhdshf",
    cookie:{ maxAge: 30000},
    resave:false,
    saveUninitialized:false
}));

app.use("/auth",authRouter);




//set templating engine
app.set('view engine', 'ejs')

//routes to controllers

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
        if(req.session.authenticated & req.session.user == username){
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

//middleware to check url and methods
function checkUrl(req,res,next){
    console.log(`${req.method}::${req.url}`);
    next();
}

//midleware to check if user is already login
function userAuth(req,res,next){
    if (req.session.authenticated) next()
    else res.status(401).json({message:"user need to login"})
};


//set app's listening port
const port = process.env.PORT || 4510;

//start application
app.listen(port,()=>console.log(`Server is running and listening on ${port}`))


