//import dependecy modules
const { render } = require('ejs');
const express = require('express');
require('dotenv').config();
// const ejs = require('ejs');

//initialize app
const app = express();

//import local modules

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(checkUrl);



//set templating engine
app.set('view engine', 'ejs')

//routes to controllers

app.get('/',(req,res)=>{
    const name = {name:"kigen"}
    res.render('index',{name:name});
})

//middleware to check url and methods
function checkUrl(req,res,next){
    console.log(`${req.method}::${req.url}`);
    next();
}


//set app's listening port
const port = process.env.PORT || 4510;

//start application
app.listen(port,()=>console.log(`Server is running and listening on ${port}`))


