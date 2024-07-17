const { models: { User } } = require('../../database/mysql/model');

const disableKey = async (apiKey) => {
    try {
      const result = await User.update(
        { isValid: false },
        { where: { apiKey: apiKey } }
      );
      return result;
    } catch (error) {
      console.error('Error updating API key status:', error);
      throw error;
    }
  };
module.exports = disableKey;