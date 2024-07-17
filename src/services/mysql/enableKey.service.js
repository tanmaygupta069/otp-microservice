const { models: { User } } = require('../../database/mysql/model');

const enableKey = async (apiKey) => {
    try {
      const result = await User.update(
        { isValid: true },
        { where: { apiKey: apiKey } }
      );
      return result;
    } catch (error) {
      console.error('Error updating API key status:', error);
      throw error;
    }
  };
module.exports = enableKey;