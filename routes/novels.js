const express = require('express');
// const userAuthenticate = require("./auth")



const router = express.Router();

//middleware to check if user is loged in.
router.use(userAuthenticate);
 
//get all novels
let novels = ["birds"];

router.get("/",(req,res)=>{
    res.status(200).send(novels)
})

//get a single novel by id

//get novels by author

//add a novel
router.post("/",(req,res)=>{
    res.send(201)
})

//update a novel

//middleware to check if user is already authenticated when using passport
function userAuthenticate(req,res,next){
    if (req.user) next();
    else res.status(401).json({ message: "user need to login" });
};

module.exports = router;
