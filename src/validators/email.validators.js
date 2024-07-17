const validator = require('validator');
/**
 * 
 * @param {String} email email to validate 
 * @returns true of false
 */
  const isValidEmail = (email)=>{
    return validator.isEmail(email);
  }

module.exports = { isValidEmail };
