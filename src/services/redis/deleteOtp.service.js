const {getRedisClient} = require('../../database/redis');
 

const deleteOtp = async(key)=>{
    const client = await getRedisClient();

    let res;
    try {
        res = await client.del(key);
        if(!res){
            throw new Error("there was an error in otp deletion.")
        }
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = deleteOtp;