const jwt = require("jsonwebtoken")
const { createError } = require("../../errors/customError")





const requireAdminAuth=async(req,res,next) => {
    const {authorization} = req.headers
    if(!authorization) return next(createError("No token has been provided",403))
    
}