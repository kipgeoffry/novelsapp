//@desc middleware to check if user is already authenticated when using passport
function userAuthenticate(req,res,next) {
    if (req.user) next();
    else res.status(401).json({ message: "user need to login" });
};

module.exports = {
    userAuthenticate
}