const express = require('express');
const { userAuthenticate } = require("./auth");
const validate = require('../middlewares/validate')
const booksValidaion = require('../validations/books.validation');
const booksController = require('../controllers/books.controller');


const router = express.Router();

//middleware to check if user is loged in when accessing the endpoint /api/books/(protecting routes)
router.use(userAuthenticate);

//add a book route
router.post("/add", validate(booksValidaion.addBook, 'body') ,booksController.addBook);

//get all books route
router.get("/all",booksController.getAllBooks);

//get a book by author route
router.get("/search", validate(booksValidaion.getBooks, 'query'), booksController.getBooks);

//get a book by id
router.get("/:id",validate(booksValidaion.getBook, 'params') ,booksController.getBook);

//update book details
router.patch("/update/:id",validate(booksValidaion.updateBook.params, 'params'),validate(booksValidaion.updateBook.body, 'body'), booksController.updateBook);

//delete book
router.delete("/delete/:id", validate(booksValidaion.deleteBook, 'params'), booksController.deleteBook);


module.exports = router
