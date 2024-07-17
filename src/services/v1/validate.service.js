/**
 * 
 * @param {String} otpToValidate 
 * @param {String} fetchedOtp 
 * @returns 
 */
const validateOtp = (otpToValidate,fetchedOtp)=>{
    return otpToValidate === fetchedOtp;
}

module.exports = validateOtp;