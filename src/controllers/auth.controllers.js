const UserModel = require("../models/users");
const { hashPassword } = require("../utils/helpers");
const httpStatus = require("http-status");

//@desc registering a user route
//@route POST /api/auth/register
//@access public
const register = async (req, res, next) => {
    const { fullName,email } = req.body;
     try {
        const dbUser = await UserModel.findOne({ email:email }); //check if email exist in DB i.e taken
        if (!dbUser) {
          const password = hashPassword(req.body.password);
          const newUser = await UserModel.create({ fullName, email, password });
          return res.status(201).json({
              "statusCode":httpStatus.CREATED,
              "successMessage":"user created successfully",
              "errorMessage":null,
              "data":dbUser
           });
        } else
          return res
            .status(400)
            .json({ 
              "statusCode":httpStatus.BAD_REQUEST,
              "successMessage":null,
              "errorMessage":"email is already taken",
              "data":null
             });
      }
     catch (error) {
      console.log(error)
      next(error)
      }
  };

//@desc logout route--this removes the req.user object
//@route POST /api/auth/logout
//@access public
  const logout = (req, res, next) => {
    req.logout(err => {
      if (err)  return next(err); 
      console.log("User logged out")
      res.status(200).json({
        "statusCode":httpStatus.OK,
        "successMessage":"logged out successfully",
        "errorMessage":null,
        "data":null
      })
    });
  };

  module.exports = {
    register,logout,
  }