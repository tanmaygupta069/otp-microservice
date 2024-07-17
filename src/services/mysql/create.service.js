const { models: { User } } = require('../../database/mysql/model');

const createKey = async (apiKey, tenantEmail) => {
  try {
    const newUser = await User.create({
      apiKey,
      tenantEmail,
    });
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

module.exports = createKey;