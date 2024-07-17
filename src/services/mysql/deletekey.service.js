const { models: { User } } = require('../../database/mysql/model');

const deleteKey = async (apiKey) => {
    try {
        const delUser = await User.destroy({
            where: {
                apiKey: apiKey
            }
        })
        return delUser;
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = deleteKey;