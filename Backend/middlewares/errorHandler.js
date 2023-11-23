const {  MongooseError } = require("mongoose");
const { CustomError } = require("../errors/customError");

const errorHandler = async (err, req, res, next) => {
  if (err) {
    if (err instanceof CustomError) {
      return res
        .status(err.status)
        .json({ message: err.message, status: err.status });
    }
    if (err instanceof MongooseError) {
      return res.status(400).json({ message: "Bad Request", error: err.message , stackTrace:err.stack });
    }
    if(err.status) {
      return res.status(err.status).json({
        message :"Unkown Error",
        error : err , 
        status : err.status , 
        stackTrace : err.stackTrace
      })
    }
    return res.status(500).json({
      message: "Internal Server Error ",
      error: err,
      status:  500,
      stackTrace: err.stackTrace,
    });
  }
  next();
};

module.exports = errorHandler;
