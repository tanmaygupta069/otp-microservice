const getOtp = require("./getOtp.service");
const saveOtp = require("./saveOtp.service");
const deleteOtp = require("./deleteOtp.service");
const checkTriesLeft = require('./checkTriesLeft.service');
const decrementTries = require('./decrementTries.service');

const convertToKey = (tenantMail,userMail) => {
    return `${tenantMail}#${userMail}`;
};

module.exports = {
  getOtp,
  saveOtp,
  deleteOtp,
  convertToKey,
  decrementTries,
  checkTriesLeft,
};
