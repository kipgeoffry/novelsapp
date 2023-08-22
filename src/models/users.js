const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
    fullName:{
        type:mongoose.Schema.Types.String,
        require:true    
    },
    email:{
        type:mongoose.Schema.Types.String,
        require:true,
        unique: true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error('Invalid email');
            }
          },
    },
    password:{
        type:mongoose.Schema.Types.String,
        require:true,
        // minlength: 8,
        // validate(value) {
        //   if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        //     throw new Error('Password must contain at least one letter and one number');
        //   }
        // },
    },
    createdAt:{
        type:mongoose.Schema.Types.Date,
        require:true,
        default:new Date()
    }
});

module.exports = mongoose.model("User",userSchema)  //model is singular and mongoose collection will be plural.

