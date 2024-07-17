const {getRedisClient} = require('../../database/redis');

const getOtp = async(key)=>{
    const client = await getRedisClient();
    let fetchedOtp ;
    try {
        fetchedOtp = await client.hGet(key,"OTP");
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
    return fetchedOtp;
}   

module.exports = getOtp;