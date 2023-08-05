const express = require('express');
const { userAuthenticate } = require("./auth");
const Book = require("../models/schemas/books");
const validate = require('../middlewares/validate')
const booksValidaion = require('../validations/books.validation');
const { findOne } = require('../models/schemas/users');


const router = express.Router();

//middleware to check if user is loged in when accessing the endpoint /api/books/(protecting routes)
router.use(userAuthenticate);

//add a book
router.post("/add", validate(booksValidaion.addBook, 'body') ,async (req,res)=>{
    const book = req.body;
    try{
        const checkBook = await Book.find({ title: book.title });
        if(checkBook.length > 0) return res.status(401).json({"message":"Book already exist "});
        const newBook = await Book.create(book);
        res.status(201).json({"message":"Book added succesfuuly"})         
    }catch (error) {
        res.status(400).json({"error":error.name,"message":error.message})
    }
});

//get all books
router.get("/all",async (req,res)=>{
    console.log("books")
    try {
        const getBooks = await Book.find({})
        res.status(200).send(getBooks)
    } catch (error) {
        res.status(400).json({"error":error.name,"message":error.message})
    }
});

//get a book by author
router.get("/search", validate(booksValidaion.getBooks, 'query'), async(req, res)=>{
    const { author } = req.query;
    try {
        const book = await Book.findOne({author});
        if(!book) return res.status(404).json({message:"Book not found"})
        res.status(200).send(book);
    } catch (error) {
        res.status(400).json({"error":error.name,"message":error.message})
    }
});

//get a book by id
router.get("/:id", async (req,res)=>{
    console.log(1)
    const { id } = req.params
    try {
        const getBook = await Book.findById(id)
        if(!getBook) return res.status(404).json({"message":`Book with ${id} not found`})
        res.status(200).send(getBook)
    } catch (error) {
        res.status(400).json({"error":error.name,"message":error.message})
    }
});

//update book details
router.patch("/update/:id", async (req,res) => {
    const { id } = req.params;
    const book = req.body;
    try {
        const updateBook = await Book.findOneAndUpdate({_id: id}, book, { new: true }) //(filter,update,options)
        res.status(200).json({"message":"Book updated"})
    } catch (error) {
        res.status(400).json({"error":error.name,"message":error.message})
    }
});

//delete book
router.delete("/delete/:id", async (req,res)=>{
    const { id } = req.params
    try {
        const getBook = await Book.findByIdAndDelete(id)
        if(!getBook) return res.status(404).json({"message":`Book not found`})
        res.status(200).json({"message":"Book deleted sucessfully"})
    } catch (error) {
        res.status(400).json({"error":error.name,"message":error.message})
    }
});


module.exports = router
