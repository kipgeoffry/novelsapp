const express = require('express');
const { userAuthenticate } = require("../middlewares/auth.passport");
const validate = require('../middlewares/validate')
const booksValidation = require('../middlewares/validate');
const booksController = require('../controllers/books.controller');


const router = express.Router();

//middleware to check if user is loged in when accessing the endpoint /api/books/(protecting routes)
// router.use(userAuthenticate);

//add a book route
router.post("/", validate(booksValidation.addBook, 'body') ,booksController.addBook);

//get all books route
router.get("/",booksController.getAllBooks);

//get a book by author route
router.get("/find", validate(booksValidation.getBooks, 'query'), booksController.getBooks);

//get a book by id
router.get("/:id",validate(booksValidation.getBook, 'params') ,booksController.getBook);

//update book details
router.patch("/:id",validate(booksValidation.updateBook, 'params'),validate(booksValidation.updateBook, 'body'), booksController.updateBook);

//delete book
router.delete("/:id", validate(booksValidation.deleteBook, 'params'), booksController.deleteBook);


module.exports = router
