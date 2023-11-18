const Joi = require('joi');
const { objectId } = require('./custom.validation')

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
    author: Joi.string(),
    // title: Joi.string(),
    // sortBy: Joi.string(),
    // limit: Joi.number().integer(),
    // page: Joi.number().integer(),
  });

  //schema for getting a book by id
const getBook = Joi.object().keys({
    id: Joi.string().custom(objectId),
  });

const updateBook = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
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
    })
    .min(1),
};

const deleteBook = Joi.object().keys({
    id: Joi.string().custom(objectId),
  });

module.exports = {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};