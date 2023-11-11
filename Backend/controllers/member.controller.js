const { MongooseError } = require("mongoose");
const { createError } = require("../errors/customError");
const { hashPassword } = require("../utils/password/Password");
const Member = require("../models/member.model");
const Event = require("../models/event.model");
const { response } = require("../utils/response/Response");
const { createToken } = require("../utils/token/createToken");
const { Recovery } = require("../utils/recovery/Recovery");
const { inTable } = require("../utils/inTable");
const recovery = new Recovery();
const cloudinary = require("../utils/cloudinary").v2;

const registerUser = async (req, res, next) => {
  const user = req.body;
  try {
    const exist = await Member.findOne({ email: user.email });
    if (exist) return response(res, "Already Registered", 200);
    const result = await cloudinary.uploader.upload(user.picture);
    user.password = await hashPassword(user.password);
    user.picture = result ; 
    user.recovery_question.answer = await recovery.hashResponse(
      user.recovery_question.answer
    );
    const registred = await Member.create(user);
    if (registred) {
      return response(
        res,
        `Registered Successfully , ID: ${registred._id}`,
        200
      );
    }
  } catch (error) {
    if (error instanceof MongooseError) return next(error);
    return next(createError(`Unknown Error , Error : ${error}`, 500));
  }
};
const imageUpload=async(req,res,next) => {
    console.log(req.picture); 
}
const loginMember = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(createError("All fields are mandatory", 400));
  try {
    const user = await Member.login(email, password);
    if (!user) return next(createError("Invalid Email or Password", 400));
    const token = createToken(user);
    return response(res, "Logged in successfullu", 200, true, token);
  } catch (error) {
    next(error);
  }
};
const recoverAccount = async (req, res, next) => {
  const { answer, email, password } = req.body;
  if (!email || !answer)
    return next(createError("Please Provide the email and your answer", 400));
  const user = await Member.findOne(
    { email: email, isMember: true },
    { recovery_question }
  );
  if (!user) return next(createError("Cannot find this user", 404));
  if (recovery.isMatching(answer, user.recovery_question.answer)) {
    const newHashed = await hashPassword(password);
    const updated = await Member.findOneAndUpdate(
      { email: email },
      { password: newHashed }
    );
    if (updated) return response(res, "Updated Successfully", 200);
    return next(createError("Internal Server Error", 500));
  }
  return next(createError("Invalid Recovery Question Answer", 400));
};
const getSingleMember = async (req, res, next) => {
  const { id } = req.params;
  try {
    const members = await Member.findOne(
      { _id: id, isMember: true },
      { password: 0, recovery_question: 0 }
    );
    if (members) return response(res, "Members retrieved", 200, false, members);
    return next(createError("Can't find this member", 404));
  } catch (error) {
    next(error);
  }
};

const updateMember = async (req, res, next) => {
  const id = req.user;
  if (!id) return next(createError("Unauthorized"));
  const changes = req.body;
  const impossible = [
    "name",
    "forname",
    "points",
    "forums",
    "recovery_question",
    "isMember",
    "CIN",
  ];
  const keys = Object.keys(changes);
  if (inTable(impossible, keys))
    return next(createError("You cannot changes this/those fields", 403));
  try {
    const member = await Member.findOneAndUpdate(
      { _id: id, isMember: true },
      changes
    );
    if (member) return response(res, "Updated successfully", 201);
    return next(createError("Cannot save changes", 505));
  } catch (error) {
    next(error);
  }
};
const getInfo = async (req, res, next) => {
  const id = req.user;
  if (!id) return next(createError("Unauthorized", 403));
  try {
    const user = await Member.findOne({ _id: id, isMember: true });
    if (user)
      return response(res, "Member retrieved successfully", 200, false, user);
  } catch (error) {
    next(error);
  }
};
const getAllMembers = async (req, res, next) => {
  const { page } = req.params || 1;
  const limit = 4;
  const skip = (page - 1) * limit;
  try {
    const members = await Member.find(
      { isMember: true },
      { password: 0, recovery_question: 0 }
    )
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
    const removeFromEvents = await Event.find(
      {},
      { participants: 1, registred: 1, id: 1 }
    );
    let participants;
    let registered;
    removeFromEvents.forEach(async (event) => {
      if (event.participants.indexOf(id) != -1)
        participants = deleteFromTable(event.participants, id);
      if (event.registred.indexOf(id) != -1)
        registered = deleteFromTable(event.registred, id);
      await Event.findOneAndUpdate(
        { _id: event.id },
        { participants, registered }
      );
    });
    if (deleted)
      return response(
        res,
        "Deleted Successfully From Members and Event List",
        204
      );
    next(createError("Server Error", 500));
  } catch (error) {
    next(error);
  }
};
const getAllRegistred = async (req, res, next) => {
  try {
    const registred = await Member.find({ isMember: false }, { password: 0 });
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
const registerMember = async (req, res, next) => {
  try {
    const { id } = req.params;
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


module.exports = {
  registerUser,
  loginMember,
  recoverAccount,
  getSingleMember,
  updateMember,
  getInfo,
  imageUpload,
  getAllMembers,
  deleteMember,
  getAllRegistred,
  registerMember
};
