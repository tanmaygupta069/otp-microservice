const API_KEY_HEADER = "Otp-X-Api-Key";

const apiKeyAuthenticationMiddleware = (req, res, next) => {
    const apiKey = req.headers[API_KEY_HEADER];
    //  todo: check presence of api key in dynamo db

    
};
