const express = require('express');
const { userAuthenticate } = require("./auth")



const router = express.Router();

//middleware to check if user is loged in when accessing the endpoint /api/novels
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


module.exports = router;
