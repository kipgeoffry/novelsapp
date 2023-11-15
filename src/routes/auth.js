const express = require("express");
const passport = require("passport");
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controllers');
const httpStatus = require('http-status');
const logger = require('../config/logger');
require('../strategies/local');

const router = express.Router();


//@desc login route using passport
//@route  POST /api/auth/login
//@access public
router.post("/login",validate(authValidation.login, 'body'),passport.authenticate('local'),(req,res)=>{
    logger.info("** login controller after user serialization **");
    res.status(200).json({
        "statusCode":httpStatus.OK,
        "successMessage":"user authenticated successfully",
        "errorMessage":null,
        "data":req.user
    })
});

//@desc logout route--this removes the req.user object
//@route POST /api/auth/logout
//@access public
router.post('/logout',authController.logout );

//@desc registering a user route
//@route POST /api/auth/register
//@access public
router.post("/register", validate(authValidation.register, 'body'), authController.register);


module.exports = router
