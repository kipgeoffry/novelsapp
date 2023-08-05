const Joi = require('joi');
const httpStatus = require('http-status');

//property will take care of body,query anf params.
const validate = (schema, property) => { 
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
       //error is undefined if validation is success,set it to null when vlidation is successful.
        const valid = error == null;
        if (!valid){
            const errorMessage = error.details.map((details) => details.message).join(', ');
            console.log("error::", errorMessage); 
            return res.status(422).json({error: errorMessage})
        };
        console.log("Input data Validated successfully")
        next();
    };
};

module.exports = validate;
