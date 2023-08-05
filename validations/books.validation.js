const Joi = require('joi');
const objectId = require('./custom.validation')

//schema for adding a book
    const addBook = Joi.object().keys({
        title: Joi.string().required().max(100),
        author: Joi.string().required().max(100),
        category: Joi.string().required().max(40),
        published: Joi.object().keys(
            { publisher: Joi.string().max(100),
              publishedYear: Joi.number() 
            }
        ),
        synopsis: Joi.string().max(300),
        cost: Joi.number().required().max(1000000),
        isbn: Joi.string().max(40),
        sku: Joi.string().required().max(40),
        image: Joi.string().max(300),
    });

//schema for getting books by using some query paramaters 
const getBooks = Joi.object().keys({
    title: Joi.string(),
    author: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  });

// const getBook = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

// const updateBook = {
//   params: Joi.object().keys({
//     userId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object().keys({
//     title: Joi.string().required().max(100),
//     author: Joi.string().required().max(100),
//     category: Joi.string().required().max(40),
//     published: Joi.object().keys(
//         { publisher: Joi.string().max(100),
//           published_year: Joi.date() 
//         }
//     ),
//     synopsis: Joi.string().max(300),
//     cost: Joi.number().required().max(1000000),
//     isbn: Joi.string().max(40),
//     sku: Joi.string().required().max(40),
//     reviews: Joi.object().keys(
//         {
//             author: Joi.string().required().max(100),
//             rating: Joi.number().min(0).max(5),
//             review: Joi.string().max(300)
//         }
//     ),        
//     image: Joi.string().max(300), 
//     })
//     .min(1),
// };

// const deleteBook = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

module.exports = {
  addBook,
  getBooks,
  // getBook,
  // updateBook,
  // deleteBook,
};