const Book = require('../models/schemas/books');

//@desc adding a book handler
//@route POST /api/books/add
//@access private/protected
const addBook = async (req,res)=>{
    const book = req.body;
    try{
        const checkBook = await Book.find({ title: book.title });
        if(checkBook.length > 0) return res.status(401).json({"message":"Book already exist "});
        const newBook = await Book.create(book);
        res.status(201).json({"message":"Book added succesfuuly"})         
    }catch (error) {
        res.status(400).json({"error":error.name,"message":error.message})
    }
};
 
//@desc get all books handler
//@route GET /api/books/all
//@access private
const getAllBooks = async (req,res)=>{
    try {
        const getBooks = await Book.find({})
        res.status(200).send(getBooks)
    } catch (error) {
        res.status(400).json({"error":error.name,"message":error.message})
    }
};

//@desc get books by author
//@route GET /api/books/search
//@access private/protected
const getBooks = async(req, res)=>{
    const { author } = req.query;
    try {
        const book = await Book.findOne({author});
        if(!book) return res.status(404).json({message:"Book not found"})
        res.status(200).send(book);
    } catch (error) {
        res.status(400).json({"error":error.name,"message":error.message})
    }
};


//@desc get a book by id Handler
//@route GET /api/books/:id
//@access private/protected
const getBook = async (req,res)=>{
    const { id } = req.params
    try {
        const getBook = await Book.findById(id)
        if(!getBook) return res.status(404).json({"message":`Book with id ${id} not found`})
        res.status(200).send(getBook)
    } catch (error) {
        res.status(400).json({"error":error.name,"message":error.message})
    }
};

//@desc update book handler
//@route PATCH /api/books/update/:id
//@access private/protected
const updateBook = async (req,res) => {
    const { id } = req.params;
    const book = req.body;
    try {
        const updateBook = await Book.findOneAndUpdate({_id: id}, book, { new: true }) //(filter,update,options)
        res.status(200).json({"message":"Book updated"})
    } catch (error) {
        res.status(400).json({"error":error.name,"message":error.message})
    }
};


//@desc delete a book handler
//@route DELETE /api/books/delete/:id
//@access private/protected
const deleteBook = async (req,res)=>{
    const { id } = req.params
    try {
        const getBook = await Book.findByIdAndDelete(id)
        if(!getBook) return res.status(404).json({"message":`Book not found`})
        res.status(200).json({"message":"Book deleted sucessfully"})
    } catch (error) {
        res.status(400).json({"error":error.name,"message":error.message})
    }
};



module.exports = {
    addBook,getAllBooks,getBooks,getBook,updateBook,deleteBook
}