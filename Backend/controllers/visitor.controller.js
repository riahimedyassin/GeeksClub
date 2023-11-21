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

module.exports = {
  addVisitor,
  getVisitors,
};
