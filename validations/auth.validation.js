const Joi = require('joi');
const { password } = require('./custom.validation')

const register = Joi.object().keys({
      email: Joi.string().required().email({ tlds: { allow: false } }),
      password: Joi.string().required(),
      fullName: Joi.string().required(),
    });
  
  const login =Joi.object().keys({
      email: Joi.string().required().email({ tlds: { allow: false } }),
      password: Joi.string().required(),
    });
      
  
  module.exports = {
    register,
    login
  };