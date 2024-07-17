const disableKey = require("../../services/mysql/disableKey.service");

const disableApiKeyController = async(req,res)=>{
    const {apiKey} = req.body;

    try {
        await disableKey(apiKey);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message : "error disabling api key"
        })
    }
    return res.status(200).json({
        message : "api key disabled"
    })
}

module.exports = disableApiKeyController;