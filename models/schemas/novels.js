const mongoose = require("mongoose");

const novelsSchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        require:true

    },
    author:{
        type:mongoose.Schema.Types.Mixed,
        require:true

    },
    category:{
        type:mongoose.Schema.Types.String,

    },
    published:{
        type:mongoose.Schema.Types.Mixed,
    },
    ratings:{
        type:mongoose.Schema.Types.Number

    },
    likes:{
        type:mongoose.Schema.Types.Number

    },
    createdAT:{
        type:mongoose.Schema.Types.Date,
        required:true,
        default:Date.now()
    }
})

module.exports = mongoose.model('Novels',novelsSchema)