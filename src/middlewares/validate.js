const Joi = require('joi');
const httpStatus = require('http-status');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

//property will take care of body,query anf params.
const validate = (schema, property) => { 
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
       //error is undefined if validation is success,set it to null when vlidation is successful.
        const valid = error == null;
        if (!valid){
            const errorMessage = error.details.map((details) => details.message).join(', ');
            logger.error(errorMessage); 
            // return res.status(422).json({error: errorMesssage})
            return next(new ApiError(httpStatus.BAD_REQUEST,errorMessage));
        };
        logger.info("Input data validated successfully")
        next();
    };
};

module.exports = validate;
