const { MongooseError } = require("mongoose");
const { createError } = require("../errors/customError");
const { hashPassword } = require("../utils/password/Password");
const  Member  = require("../models/member.model");
const { response } = require("../utils/response/Response");



const registerUser=async(req,res,next)=> {
    const user = req.body ; 
    try {
        const exist = await Member.findOne({email:user.email})
        if(exist) return response(res,"Already Registered",200)
        user.password = await hashPassword(user.password)
        const registred = await Member.create(user) 
        if(registred) {
            return response(res,`Registered Successfully , ID: ${registred._id}`,200)
        }
    } catch (error) {
        if(error instanceof MongooseError) return next(error)
        return next(createError(`Unknown Error , Error : ${error}`,500))
    }
}

module.exports= {
    registerUser
}