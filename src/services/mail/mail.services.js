const { transporter } = require("../../constants/nodemailer.constants");
const { signupFormat , apiKeyFormat} = require("../../constants/nodemailer.constants");

const sendMail = async (otp, expiry, userMail) => {
  const info = await transporter.sendMail(signupFormat(otp, expiry, userMail));
};

const sendMailApiKey = async (key,mail) => {
  const info = await transporter.sendMail(apiKeyFormat(key,mail));
};

module.exports = {
  sendMail,
  sendMailApiKey
};
