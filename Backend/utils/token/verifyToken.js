const jwt = require("jsonwebtoken")
const SECRET_KEY= process.env.SECRET_KEY

const verfiyToken=async(token)=> {
    try {
        const verified = jwt.verify(token,SECRET_KEY);
        return verified
    } catch (error) {
        return null
    }
}

module.exports={verfiyToken}