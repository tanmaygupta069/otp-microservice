const { getRedisClient } = require('../../database/redis');

const decrementTries = async(key) => {
    const client = await getRedisClient();
    const field = 'TRIES';
    let newTries;
    try {
        newTries = await client.hIncrBy(key, field, -1);
    } catch (error) {
        throw new Error('Failed to decrement tries.');
    }
    return newTries;
};

module.exports = decrementTries;