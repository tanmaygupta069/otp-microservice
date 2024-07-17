const { models: { User } } = require('../../database/mysql/model');

const getKey = async(apiKey)=>{
        try {
            const user = await User.findOne({
                where: {
                    apiKey: apiKey
                }
            })
            return user;
        } catch (error) {
            console.log(error);
            throw(error);
        }
}
module.exports = getKey;