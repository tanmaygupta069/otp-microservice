const validator = require('validator');

const isNumber  = (otp)=>{
    return validator.isNumeric(otp);
}

module.exports = isNumber;