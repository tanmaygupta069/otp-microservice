const { v4: uuidv4 } = require("uuid");
const { sendMailApiKey } = require("../../services/mail/mail.services");
const createKey = require("../../services/mysql/create.service");
const getKey = require("../../services/mysql/getKey.service")
const {isValidEmail} = require("../../validators/email.validators")

const generateApiKeyController = async (req, res) => {
  const { tenantmail } = req.body;

  if (!tenantmail) {
    return res.status(422).json({
      message: "required field empty : tenantmail",
    });
  }
  if(!isValidEmail(tenantmail)){
    return res.status(400).json({
        message: "please enter an email",
      });
  }

  const apiKey = uuidv4();
  try {
    await sendMailApiKey(apiKey, tenantmail);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "the was some error in sending apikey",
    });
  }


  let result;
  try {
    result = await createKey(apiKey, tenantmail);
  } catch (error) {
    console.log(error);
  }
  if(!result){
    res.status(400).json({
        message: "there was some error in creating key"
    })
  }
  res.status(200).json({
    message: `the apikey has been sent to ${tenantmail}.`
})
};

module.exports = generateApiKeyController;
