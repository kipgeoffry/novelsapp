const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title:{
        type:mongoose.Schema.Types.String,
        require:true
    },
    author:{
        type:mongoose.Schema.Types.Mixed,
        require:true
    },
    category:{
        type:mongoose.Schema.Types.String,
        require:true
    },
    published:{
        type: mongoose.Schema.Types.Mixed,
        properties: {
            publisher: {
                type: String
            },
            published_year: {
                type: Number
            }
        }
    },
    synopsis:{
        type:mongoose.Schema.Types.String,
    },
    cost:{
        type:mongoose.Schema.Types.Number,
        required:true
    },
    isbn:{
        type:mongoose.Schema.Types.Number
    },
    sku:{
        type:mongoose.Schema.Types.String,
        require:true
    },
    rating:{
        type:mongoose.Schema.Types.Number
    },
    reviews:{
        type: mongoose.Schema.Types.Array,
        items: {
            type: mongoose.Schema.Types.ObjectId,
            properties: {
                author: {
                    type: String
                },
                rating: {
                    type: Number
                },
                review: {
                    type: String
                }
            }
        }
    },
    image:{
        type:mongoose.Schema.Types.String
    },
    createdAt:{
        type:mongoose.Schema.Types.Date,
        required:true,
        default:Date.now()
    }
})

module.exports = mongoose.model('Book', bookSchema)