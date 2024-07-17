const { getRedisClient } = require("../../database/redis");
const convertKey = require("./index");
/**
 *
 * @param {String} tenantEmail
 * @param {String} useCase
 * @param {String} userEmail
 * @param {Number} otp
 * @param {Number} expiry
 */
const saveOtp = async (key, otp, expiry) => {
  const client = await getRedisClient();
  const timeStamp = Date.now();
  let res;
  try {
    res = await client.hSet(
      key,
      {
        "OTP": `${otp}`,
        "TRIES" : "3",
        "TIMESTAMP" : `${timeStamp}`,
        "EXP" : `${expiry} sec`
      }
    );
    await client.expire(key, expiry);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = saveOtp;
