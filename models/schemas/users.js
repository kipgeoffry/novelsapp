const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:mongoose.Schema.Types.String,
        require:true
    },
    password:{
        type:mongoose.Schema.Types.String,
        require:true
    },
    createsAt:{
        type:mongoose.Schema.Types.Date,
        require:true,
        default:Date.now()
    }
});

module.exports = mongoose.model("Users",userSchema)

