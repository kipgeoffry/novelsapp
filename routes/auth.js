const express = require("express");
const passport = require("passport");
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controllers');
require('../strategies/local');

const router = express.Router();


//@desc login route using passport
//@route  POST /api/auth/login
//@access public
router.post("/login",validate(authValidation.login, 'body'),passport.authenticate('local'),(req,res)=>{
    console.log('authenticated')
    res.status(200).send(req.session)
});

//@desc logout route--this removes the req.user object
//@route POST /api/auth/logout
//@access public
router.post('/logout',authController.logout );

//@desc registering a user route
//@route POST /api/auth/register
//@access public
router.post("/register", validate(authValidation.register, 'body'), authController.register);


//BELOW CODE Implementation without Passport

//logging in route without using passport
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (email && password) {
//     if (req.session.authenticated && req.session.user == email) {
//       return res.status(200).json({ message: "user is already authenticate" });
//     } else {
//       const dbUser = await UserModel.findOne({ email:email });
//       if (!dbUser) return res.status(405).json({ Message: "User Not Found" });
//       const isValid = comparedPassword( password, dbUser.password );//compares db hashed pass with raw pass from user,if matches,it returns true
//       if (isValid) {  //modify session to allow session id to be sent as cookie
//         req.session.authenticated = true;
//         req.session.user = email;
//         res.status(200).json({ message: "User authenticated successfully" });
//       } else return res.status(401).json({ message: "Bad credentials" });
//     }
//   } else res.status(400).json({ message: "username or password required" });
// });

//midleware to check if user is already login
// function userAuth(req, res, next) {
//   if (req.session.authenticated && req.session.user == req.body.email) next();
//   else res.status(401).json({ message: "user need to login" });
// }

module.exports = router
