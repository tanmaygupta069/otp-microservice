const ratelimiter = require("express-rate-limit");
const {milliSeconds} = require('../constants/time.constants');
const {rateLimit} = require('../config');

/**
 * documentation: {@link https://www.npmjs.com/package/express-rate-limit}
 * @returns rateLimitingMiddleware
 */
const rateLimitMiddelware = ({
  windowMs = milliSeconds.ONE_MIN,
  limit = 10,
  standardHeaders = rateLimit.STANDARD_HEADERS,
  legacyHeaders = false,
}) => {
  const limiter = ratelimiter({
    windowMs,
    limit,
    standardHeaders,
    legacyHeaders,
  });
  return limiter;
};

module.exports = rateLimitMiddelware;
