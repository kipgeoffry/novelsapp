const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{type:mongoose.Schema.Types.String,
        require:true    
    },
    email:{
        type:mongoose.Schema.Types.String,
        require:true,
        unique: true
    },
    password:{
        type:mongoose.Schema.Types.String,
        require:true
    },
    createdAt:{
        type:mongoose.Schema.Types.Date,
        require:true,
        default:new Date()
    }
});

module.exports = mongoose.model("User",userSchema)

