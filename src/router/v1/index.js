const { rateLimit } = require("../../config");
const express = require("express");
const generateController = require("../../controllers/v1/generate.controller");
const validateController = require("../../controllers/v1/validate.controller");
const rateLimitMiddelware = require("../../middlewares/ratelimit.middleware");
const resendController = require('../../controllers/v1/resend.controller');
const generateApiKeyController = require("../../controllers/v1/generateApiKey.controller");
const disableApiKeyController = require('../../controllers/v1/disableApiKey.controller')
const enableApiKeyController = require('../../controllers/v1/enableApiKey.controller.') 

const v1Router = express.Router();

v1Router.post("/generate",rateLimitMiddelware({
    limit: rateLimit.GENERATE_API_LIMIT_PER_MIN
}), generateController);

v1Router.post("/validate",rateLimitMiddelware({
    limit: rateLimit.VALIDATE_API_LIMIT_PER_MIN
}),validateController);

v1Router.post("/generateApiKey",generateApiKeyController)

v1Router.post("/resend",resendController)

v1Router.patch("/disableApiKey",disableApiKeyController)


v1Router.patch("/enableApiKey",enableApiKeyController)

module.exports = v1Router;
