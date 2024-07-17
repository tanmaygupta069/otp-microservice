const {
  getOtp,
  deleteOtp,
  decrementTries,
  checkTriesLeft,
  convertToKey
} = require("../../services/redis");
const isNumber = require("../../validators/isNumeric.validator");
const validateOtp = require("../../services/v1/validate.service");
const {isValidEmail} = require("../../validators/email.validators");
const getKey = require("../../services/mysql/getKey.service")

const validateController = async (req, res) => {
  const { otp, userMail, usecase } = req.body;

  const apiKey = req.headers['my-service-api-key'];

  if(!otp){
    return res.status(422).json(
      {
        message: "enter the otp"
      }
    )
  }

  if(!userMail){
    return res.status(422).json(
      {
        message: "required field empty : 'userMail'"
      }
    )
  }

  let apiRes;
  try {
    apiRes = await getKey(apiKey);
  } catch (error) {
    console.log(error);
  }
  if(!apiRes){
    res.status(401).json({
      message : "invalid API key"
    })
  }

  const tenantMail = apiRes.dataValues.tenantEmail;
  const isValid = apiRes.dataValues.isValid;

  if(!isValid){
    res.status(401).json({
      message : "invalid API key"
    })
  }

  const key = convertToKey(tenantMail, userMail);


  if (!isValidEmail(userMail)) {
    return res.status(400).json({
      message: `invalid email: ${req.body.userMail}`,
    });
  }


  

  if (!isNumber(otp)) {
    return res.status(400).json({
      message: "The entered otp is not a number.",
    });
  }

  const tries = await checkTriesLeft(key);

  if (parseInt(tries) <= 0) {
    await deleteOtp(key);
    return res.status(429).json({
      message: "you have exeedeed the amount of tries.",
    });
  }

  let fetchedOtp;
   try {
    fetchedOtp = await getOtp(key);
     if (!fetchedOtp) {
       return res.status(400).json({
         message: "no otp found",
       });
    }
   } catch (error) {
     console.log(error);
  }

  if (validateOtp(otp, fetchedOtp)) {
    const result = await deleteOtp(key);
    console.log("otp deleted.");
    return res.status(200).json({
      message: "the otp is valid",
    });
  }

  let newTries = await decrementTries(key);
  return res.status(401).json({
    message: `the otp is invalid, you have ${newTries} tries remaning`,
  });
};

module.exports = validateController;
