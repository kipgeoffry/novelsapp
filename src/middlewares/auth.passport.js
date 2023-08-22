const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

//@desc middleware to check if user is already authenticated when using passport
function userAuthenticate(req,res,next) {
    if (req.user) next();
    else throw new ApiError(httpStatus.UNAUTHORIZED,"User needs to be authenticated")
    // res.status(401).json({ message: "User needs to login" });
};

module.exports = {
    userAuthenticate
}