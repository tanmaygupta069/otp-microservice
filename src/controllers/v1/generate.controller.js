const { isValidEmail } = require("../../validators/email.validators");
const validUsecase = require("../../validators/usecase.validator");
const generateOtp = require("../../services/v1/generateOtp.service");
const {saveOtp,convertToKey, getOtp} = require("../../services/redis/index");
const { sendMail } = require("../../services/mail/mail.services");
const {otpConfig} = require("../../config")
const getKey = require("../../services/mysql/getKey.service");

const generateController = async (req, res) => {
  const { mail, usecase, expiry_in_min } = req.body;

  const apiKey = req.headers['my-service-api-key'];

  

  if(!mail){
    return res.status(422).json(
      {
        message : "required field empty : 'useMail'"
      }
    )
  }


  if (!isValidEmail(mail)) {
    return res.status(400).json({
      message: `invalid email: ${req.body.mail}`,
    });
  }

  const expiration = (expiry_in_min || otpConfig.EXPIRY) * 60;

  if (!validUsecase(usecase)) {
    return res.status(400).json({
      message: `invalid usecase: ${usecase}`,
    });
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

  const tenantEmail = apiRes.dataValues.tenantEmail;
  const isValid = apiRes.dataValues.isValid;

  if(!isValid){
    res.status(401).json({
      message : "invalid API key"
    })
  }

  const key = convertToKey(tenantEmail,mail);

  const otp = generateOtp();
  let check;
  try {
    check = await getOtp(key);
  } catch (error) {
    console.log(error);
  }
  if(check){
    return res.json({
      message:"otp already sent to email"
    })
  }

  try {
    await saveOtp(key, otp, expiration);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message:`there was some error in saving otp`
    })
  }
  
  try {
    await sendMail(otp,expiration,mail);
  } catch (error) {
    console.log("error in sending mail",error)
  }
  res.status(200).json(`Your otp has been sent to ${mail}.`)

};

module.exports = generateController;
