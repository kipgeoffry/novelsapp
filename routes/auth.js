const express = require("express");
const UserModel = require("../models/schemas/users");
const { hashPassword, comparedPassword } = require("../utils/helpers");
const passport = require("passport");
require('../strategies/local')


const router = express.Router();

router.get("/login",userAuthenticate, async (req, res) => {
  const users = await UserModel.find({});
  res.status(200).json(users);
});

//logging in route
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


//login route using passport
router.post("/login",passport.authenticate('local'),(req,res)=>{
    console.log('authenticated')
    res.send(req.session)
})

//register route
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const dbUser = await UserModel.findOne({ email:email }); //check is user exist in DB
      if (!dbUser) {
        const password = hashPassword(req.body.password);
        const newUser = await UserModel.create({ email, password });
        return res.status(201).json({ message: "user added" });
      } else
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
    } else
      return res.status(400).json({ message: "email and password required" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({error:error.message});
    }
});

//midleware to check if user is already login
// function userAuth(req, res, next) {
//   if (req.session.authenticated && req.session.user == req.body.email) next();
//   else res.status(401).json({ message: "user need to login" });
// }

//middleware to check if user is already authenticated when using passport
function userAuthenticate(req,res,next){
    if (req.user) next();
    else res.status(401).json({ message: "user need to login" });
};

// module.exports = router
module.exports = router