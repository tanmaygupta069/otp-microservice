const nodemailer = require("nodemailer");
const { nodeMailer } = require("../config");

const transporter = nodemailer.createTransport({
  host: nodeMailer.HOST,
  port: nodeMailer.PORT,
  auth: {
    user: nodeMailer.USER,
    pass: nodeMailer.PASS,
  },
});

const signupFormat = (otp,expiry,userMail) => {
  return {
    from: `${nodeMailer.USER}`, // sender address
    to: `${userMail}`, // list of receivers
    subject: "Otp microservice", // Subject line
    text: `Your Otp for signup is ${otp}.It is valid for ${expiry / 60} minutes.`, // plain text body
    html: `Your Otp for signup is ${otp}.It is valid for ${expiry / 60} minutes.`,
  };
};

const apiKeyFormat = (apikey,userMail) => {
  return {
    from: `${nodeMailer.USER}`, // sender address
    to: `${userMail}`, // list of receivers
    subject: "Api Key", // Subject line
    text: `Your generated apiKey is ${apikey}.`, // plain text body
    html: `Your generated apiKey is ${apikey}.`,
  };
}

module.exports = {
  transporter,
  signupFormat,
  apiKeyFormat
};
