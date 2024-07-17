const enableKey = require("../../services/mysql/enableKey.service");

const enableApiKeyController = async(req,res)=>{
    const {apiKey} = req.body;

    try {
        await enableKey(apiKey);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message : "error enabling api key"
        })
    }
    return res.status(200).json({
        message : "api key enabled"
    })
}

module.exports = enableApiKeyController;