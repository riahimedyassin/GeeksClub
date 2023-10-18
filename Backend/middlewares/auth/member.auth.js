const jwt = require("jsonwebtoken")
const { createError } = require("../../errors/customError")
const {verfiyToken} = require("../../utils/token/verifyToken")



const requireMemberAuth=async(req,res,next) => {
    try {
        const {authorization} = req.headers
        if(!authorization) return next(createError("No token has been provided",403));
        const verfied = await verfiyToken(authorization);
        console.log(verfied)
        if(!verfied) return next(createError("Unauth",403))
        req.user=verfied.id
        next()
    } catch (error) {
        return next(createError("Unauthorized",403))
    }
    
}

module.exports={requireMemberAuth}