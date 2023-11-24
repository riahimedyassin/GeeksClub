const { MongooseError } = require("mongoose");
const { createError } = require("../errors/customError");
const { hashPassword } = require("../utils/password/Password");
const Member = require("../models/member.model");
const Event = require("../models/event.model");
const { response } = require("../utils/response/Response");
const { createToken } = require("../utils/token/createToken");
const { Recovery } = require("../utils/recovery/Recovery");
const { inTable } = require("../utils/inTable");
const { lazyResponse } = require("../utils/response/LazyResponse");


const recovery = new Recovery();

const registerUser = async (req, res, next) => {
  const user = req.body;
  try {
    const exist = await Member.findOne({ email: user.email });
    if (exist) return response(res, "This email is already in use", 400);
    user.password = await hashPassword(user.password);
    user.recovery_question.answer = await recovery.hashResponse(
      user.recovery_question.answer
    );
    const registred = await Member.create(user);
    if (registred) {
      return response(
        res,
        `Registered Successfully , We will be contacting you soon !`,
        200
      );
    }
  } catch (error) {
    if (error instanceof MongooseError) return next(error);
    return next(createError(`Unknown Error , Error : ${error}`, 500));
  }
};


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
  const { answer, email, password, question } = req.body;
  if (!email || !answer || !password || !question)
    return next(createError("All fields are manadatory", 400));
  const user = await Member.findOne(
    { email: email, isMember: true },
    { recovery_question : 1 }
  );
  if (!user) return next(createError("Cannot find this user", 404));
  if (recovery.isMatching(answer, user.recovery_question.answer) && question===user.recovery_question.question ) {
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
      { _id: id },
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
    const member = await Member.findOneAndUpdate({ _id: id }, changes);
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
    const user = await Member.findOne({ _id: id });
    if (user)
      return response(res, "Member retrieved successfully", 200, false, user);
    return next(createError("Unauthorized", 403));
  } catch (error) {
    next(error);
  }
};
const getAllMembers = async (req, res, next) => {
  const { page } = req.params || 1;
  const limit = 4;
  const skip = (page - 1) * limit;
  try {
    const members = await Member.find({}, { password: 0, recovery_question: 0 })
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
    const removeFromEvents = await Event.find({}, { participants: 1, _id: 1 });
    let participants;
    removeFromEvents.forEach(async (event) => {
      if (event.participants.indexOf(id) != -1)
        participants = deleteFromTable(event.participants, id);
      await Event.findOneAndUpdate({ _id: event.id }, { participants });
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
const getRecoverQuestion = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(createError("Please provide your email", 400));
  try {
    const user = await Member.findOne({ email: email, isMember:true }, { recovery_question: 1 });
    if (!user) return next(createError("Cannot find this user", 404));
    return response(
      res,
      "Used question retireved succussfully",
      200,
      false,
      user.question
    );
  } catch (error) {
    next(error);
  }
};
const uploadMemberImage=async(req,res,next) => {
  const id = req.user ;
  const {link} = req.body ; 
  if(!link) return next(createError("Please provide the link "))
  if(!id) return next(createError("No auth header is provided"))
  try {
      const member = await Member.findOneAndUpdate({_id:id},{picture:link})
      if(member) return response(res,"Image uploaded successfully",200,false ,member)
      return next(createError('Cannot save picture',500))
  } catch (error) {
      next(error)
  }
}
const getMembersCount = async(req,res,next)=> {
    const members = await Member.find({},{_id:1})
    const length = members.length 
    return response(res,"Members length retrieved",200,false,length)
}


module.exports = {
  registerUser,
  loginMember,
  recoverAccount,
  getSingleMember,
  updateMember,
  getInfo,
  getAllMembers,
  deleteMember,
  getAllRegistred,
  registerMember,
  getRecoverQuestion,
  uploadMemberImage,
  getMembersCount
};
