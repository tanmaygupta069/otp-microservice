/**
 *
 * @param {String} msg the failure payload message
 * @returns failure payload object
 */
const getFailurePayload = (msg) => {
  return Object.freeze({
    msg,
  });
};

module.exports = { getFailurePayload };
