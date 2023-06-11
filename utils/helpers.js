const bcrypt = require("bcrypt");

//sync method of hashing
function hashPassword(password){
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash
};

//asycn method of hashing password


//compare raw and db hashed password
function comparedPassword(rawpass,hashedpass){
    return bcrypt.compareSync(rawpass,hashedpass);
};

module.exports = {hashPassword,comparedPassword};