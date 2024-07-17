const { isValidEmail } = require("../../validators/email.validators");
const validUsecase = require("../../validators/usecase.validator");
const generateOtp = require("../../services/v1/generateOtp.service");
const { saveOtp, convertToKey ,getOtp,deleteOtp} = require("../../services/redis/index");
const { sendMail } = require("../../services/mail/mail.services");
const { otpConfig } = require("../../config");
const checkTime = require("../../services/redis/getTime.service");
const getKey = require('../../services/mysql/getKey.service')

const resendController = async (req, res) => {
  const { userEmail, useCase, expiry } = req.body;

  const apiKey = req.headers['my-service-api-key'];

  if(!userEmail){
    return res.status(422).json(
      {
        message : "required field empty : 'useMail'"
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

  const tenantEmail = apiRes.dataValues.tenantEmail;
  const isValid = apiRes.dataValues.isValid;
  
  
  if(!isValid){
    res.status(401).json({
      message : "invalid API key"
    })
  }

  const key = convertToKey(tenantEmail, userEmail);

  let time;
  try {
    time = await checkTime(key);
  } catch (error) {
    console.log(error);
  }
  
  if(Date.now() - parseInt(time) < 30000){
    return res.json({
      message:`wait for another ${30 - (Math.floor((Date.now() - parseInt(time))/1000))} seconds` 
    })
  }

  let fetchedOtp;
  try {
    fetchedOtp = await getOtp(key);
  } catch (error) {
    console.log("there was error reading the otp.",error)
  }  
  if(fetchedOtp){
    await deleteOtp(key);
  }

  if (!isValidEmail(userEmail) || !isValidEmail(tenantEmail)) {
    return res.status(400).json({
      message: `invalid email: ${req.body.userEmail}`,
    });
  }

  const expiration = (expiry || otpConfig.EXPIRY) * 60;

  if (!validUsecase(useCase)) {
    return res.status(400).json({
      message: `invalid usecase: ${req.body.usecase}`,
    });
  }

  const otp = generateOtp();
  try {
    await saveOtp(key, otp, expiration);
  } catch (error) {
    console.log("error while saving the otp", error);
  }

  try {
    await sendMail(otp, expiration, userEmail);
  } catch (error) {
    console.log("error in sending mail", error);
  }
  res.status(200).json(`Your otp has been sent to ${userEmail}.`);
}

module.exports = resendController;

