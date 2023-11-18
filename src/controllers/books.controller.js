const Book = require('../models/books');
const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

//@desc adding a book handler
//@route POST /api/books/add
//@access private/protected
const addBook = async (req,res, next)=>{
    const book = req.body;
    try{
        const checkBook = await Book.find({ title: book.title });
        if(checkBook.length > 0) throw new ApiError(httpStatus.BAD_REQUEST, "book already exist");
        await Book.create(book);
        res.status(201).json({
            "statusCode":201,
            "successMessage":"Book added successfully",
            "errorMessage":null,
            "data":null
        })         
    }catch (error) {
        next(error)
    }
};
 
//@desc get all books handler
//@route GET /api/books/all
//@access private
const getAllBooks = async (req,res,next)=>{
    try {
        const getBooks = await Book.find({})
        res.status(200).json({
            "statusCode":httpStatus.OK,
            "successMessage":"fetch books success",
            "errorMessage":null,
            "data":getBooks
        })
    } catch (error) {
        next(error)
    }
};

//@desc get books by author
//@route GET /api/books/search
//@access private/protected
//used error collecting utility catchAsync
const getBooks = catchAsync(async(req, res)=>{
    const { author } = req.query;
    const book = await Book.findOne({author});
    if(!book) throw new ApiError(httpStatus.NOT_FOUND, `No books by author ${author} found`);
    res.status(200).json({
        "statusCode":httpStatus.OK,
        "successMessage":"fetch book success",
        "errorMessage":null,
        "data":book
    });
    });


//@desc get a book by id
//@route GET /api/books/:id
//@access private/protected
const getBook = catchAsync(async (req,res)=>{
    const { id } = req.params
    const getBook = await Book.findById(id)
    if(!getBook) throw new ApiError(httpStatus.NOT_FOUND, `book with id ${id} not found`)
    res.status(200).json({
        "statusCode":httpStatus.OK,
        "successMessage":"fetch book success",
        "errorMessage":null,
        "data":getBooks
    })
});

//@desc update book handler
//@route PATCH /api/books/update/:id
//@access private/protected
const updateBook = catchAsync(async (req,res) => {
    const { id } = req.params;
    const book = req.body;
    const getBook = await Book.findById(id)
    if(!getBook) throw new ApiError(httpStatus.NOT_FOUND, "book not found");
    await Book.updateOne({_id: id}, book, { new: true }) //(filter,update,options)
    res.status(200).json({
        "statusCode":httpStatus.OK,
        "successMessage":"book updated successfully",
        "errorMessage":null,
        "data":null
    })
});


//@desc delete a book handler
//@route DELETE /api/books/delete/:id
//@access private/protected
const deleteBook = catchAsync(async (req,res,next)=>{
    const { id } = req.params
    const getBook = await Book.findByIdAndDelete(id)
    if(!getBook) throw new ApiError(httpStatus.NOT_FOUND, `book not found`)
    res.status(200).json({
        "statusCode":httpStatus.OK,
        "successMessage":"book deleted successfully",
        "errorMessage":null,
        "data":null
    })
});

module.exports = {
    addBook,
    getAllBooks,
    getBooks,
    getBook,
    updateBook,
    deleteBook
}