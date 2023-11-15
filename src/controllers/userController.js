const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/userService")

//@desc create a user
//@route GET /api/
//@access private/protected
const createUser = catchAsync(async(req, res) =>{
    const user = await userService.createUser(req.body)
    res.status(201).json({
        "statusCode":httpStatus.OK,
        "successMessage":"user created successfully",
        "errorMessage":null,
        "data":user
    })
})




//@desc get books by author
//@route GET /api/books/search
//@access private/protected
const getBooks = catchAsync(async(req, res, next)=>{
    const { author } = req.query;
    const book = await Book.findOne({author});
    // if(!book) return res.status(404).json({message:"Book not found"})
    if(!book) throw new ApiError(httpStatus.NOT_FOUND, `No books by author ${author} found`);
    res.status(200).json({
        "statusCode":httpStatus.OK,
        "successMessage":"fetch book success",
        "errorMessage":null,
        "data":book
    });
    });

module.exports ={
    createUser,
}