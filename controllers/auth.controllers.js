const UserModel = require("../models/schemas/users");
const { hashPassword } = require("../utils/helpers");

//@desc registering a user route
//@route POST /api/auth/register
//@access public
const register = async (req, res) => {
    const { fullName,email } = req.body;
     try {
        const dbUser = await UserModel.findOne({ email:email }); //check if email exist in DB i.e taken
        if (!dbUser) {
          const password = hashPassword(req.body.password);
          const newUser = await UserModel.create({ fullName, email, password });
          return res.status(201).json({ message: "user added" });
        } else
          return res
            .status(400)
            .json({ message: `Email ${email} is already taken` });
      }
     catch (error) {
      console.log(error)
      return res.status(500).json({error:error.message});
      }
  };

//@desc logout route--this removes the req.user object
//@route POST /api/auth/logout
//@access public
  const logout = (req, res, next) => {
    req.logout(err => {
      if (err)  return next(err); 
      console.log("User logged out")
      res.status(200).json({"message":"User logged out"})
    });
  };

  module.exports = {
    register,logout,
  }