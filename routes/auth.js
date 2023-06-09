const express = require('express');
const UserModel = require("../models/schemas/users");

const router = express.Router();

router.get("/login",(req,res)=>{
    res.status(200).json({message:"authenticated"})

});

//logging in route
router.post("/login",(req,res)=>{
    const { email, password } = req.body;


});

//register route
router.post("/register",async (req,res)=>{
    const { email, password } = req.body;
    if ( email && password ){
        const dbUser = await UserModel.find({email:email}) //check is user exist in DB
        if (dbUser.length === 0 ){
            const newUser = await UserModel.create({email,password});
            res.status(201).json({message:"user added"});
        }else return res.status(400).json({message:`User with ${email} already exist`})

    }else res.status(400).json({message:"email and password required"})

});








module.exports = router;