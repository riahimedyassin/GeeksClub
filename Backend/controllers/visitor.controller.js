const { response } = require("../utils/response/Response");
const Visitor = require("../models/visitor.model");
const { createError } = require("../errors/customError");

const token = process.env.IP_TOKEN;

const addVisitor = async (req, res, next) => {
  const data = req.body;
  const visit = await Visitor.findOne({ ip: data.ip });
  if (visit) {
    const done = await Visitor.findByIdAndUpdate(
      { _id: visit._id },
      { $inc: { count: 1 } }
    );
    if (done) return response(res, "Managed Succussfully", 200);
    else return next(createError("Cannot save the visitors data", 500));
  } else {
    const newVisitor = await Visitor.create({
      ...data,
      count: 1,
    });
    if (newVisitor) return response(res, "New visitor added succussfully", 200);
    else return next(createError("Internal Server Error", 500));
  }
};
const getVisitors = async (req, res, next) => {
  try {
    const vistors = await Visitor.find({});
    if (vistors)
      return response(
        res,
        "Visitors Retrieved Succussfully",
        200,
        false,
        vistors
      );
    return next(createError("Error occured", 500));
  } catch (error) {
    next(error);
  }
};
const blockUser=async(req,res,next) => {
  const {ip} = req.body
  try {
      const visitor = await Visitor.findOneAndUpdate({ip:ip},{blocked:true})
      if(visitor) return response(res,"Blocked",200)
      return next(createError("Cannot block this user"))
  } catch (error) {
      next(error)
  }
}
const retrieveUser=async(req,res,next) => {
  const {ip} = req.body
  try {
      const visitor = await Visitor.findOneAndUpdate({ip:ip},{blocked:false})
      if(visitor) return response(res,"Blocked",200)
      return next(createError("Cannot block this user"))
  } catch (error) {
      next(error)
  }
}
const blockedList = async(req,res,next) => {
  try {
      const blocked = await Visitor.find({blocked:true },{ip:1})
      if(blocked) return response(res,'Blocked List',200,false , blocked)
      return next(createError("Cannot retrieve list ",500))
  } catch (error) {
      next(error)
  }
}


module.exports = {
  addVisitor,
  getVisitors,
  blockUser,
  retrieveUser,
  blockedList
};
