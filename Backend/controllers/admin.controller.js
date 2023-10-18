const { MongooseError } = require("mongoose");
const { createError } = require("../errors/customError");
const Member = require("../models/member.model");
const { response } = require("../utils/response/Response");
const { lazyResponse } = require("../utils/response/LazyResponse");

const registerMember = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) return next(createError("Provide the ID of the USER", 400));
    let user = await Member.findOneAndUpdate({ _id: id }, { isMember: true });
    if (user) {
      return response(res, "Member added successfully", 200);
    }
    return next(createError(`Failed To Add as a member`, 500));
  } catch (error) {
    if (error instanceof MongooseError) return next(error);
    return next(createError(`Unkown Error : ${error}`, 500));
  }
};
const getAllRegistred = async (req, res, next) => {
  try {
    const registred = await Member.find({ isMember: false });
    if (registred) {
      return response(
        res,
        "Registered Members Retrieved Successfully",
        200,
        false,
        registred
      );
    }
    return next(createError("Server Error", 500));
  } catch (error) {
    return next(error);
  }
};
const getAllMembers = async (req, res, next) => {
  const { page } = req.params || 1;
  const limit = 4;
  const skip = (page - 1) * limit;
  try {
    const members = await Member.find({ isMember: true })
      .skip(skip)
      .limit(limit);
    if (members)
      return lazyResponse(res, "Members Retrieved Successfully", 200, members);
    return next(createError("Server Error", 500));
  } catch (error) {
    next(error);
  }
};
const deleteMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) next(createError("Please provide the user's ID", 400));
    const deleted = await Member.findOneAndDelete({ _id: id });
    if (deleted) return response(res, "Deleted Successfully", 204);
    next(createError("Server Error", 500));
  } catch (error) {
    next(error);
  }
};



module.exports = {
  registerMember,
  getAllRegistred,
  getAllMembers,
  deleteMember,
};
