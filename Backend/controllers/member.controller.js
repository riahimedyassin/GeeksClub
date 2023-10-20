const { MongooseError } = require("mongoose");
const { createError } = require("../errors/customError");
const { hashPassword } = require("../utils/password/Password");
const Member = require("../models/member.model");
const Event = require("../models/event.model");
const { response } = require("../utils/response/Response");
const { createToken } = require("../utils/token/createToken");
const { Recovery } = require("../utils/recovery/Recovery");
const recovery = new Recovery();

const registerUser = async (req, res, next) => {
  const user = req.body;
  try {
    const exist = await Member.findOne({ email: user.email });
    if (exist) return response(res, "Already Registered", 200);
    user.password = await hashPassword(user.password);
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
const attendEvent = async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user;
  if (!user_id) next(createError("Unauthorized", 403));
  if (!id)
    return next(
      createError("Please provide the ID of the event and the USER", 400)
    );
  try {
    const event = await Event.findOne({ _id: id },{registred:1});
    if (event) {
      event.registred.push(user_id);
      const up = await Event.findOneAndUpdate(
        { _id: id },
        { registred: event.registred }
      );
      if (up)
        return response(res, "You are now participating to that event", 200);
      next(createError("Cannot Participate at that event", 400));
    }
    return next(createError("Event not found", 404));
  } catch (error) {
    next(error);
  }
};
const getLeaderboard = async (req, res, next) => {
  console.log(req.user);
  try {
    const members = await Member.find({}, { name: 1, forname: 1, points: 1 });
    if (members) {
      return response(
        res,
        "Leaderboard retrieved Successfully",
        200,
        false,
        members
      );
    }
    return next(createError("Cannot retrieve leaderboard ", 400));
  } catch (error) {
    next(error);
    console.log(error);
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
    console.log(error);
  }
};
const recoverAccount = async (req, res, next) => {
  const { answer, email , password } = req.body;
  if (!email || !answer) return next(createError("Please Provide the email and your answer", 400));
  const user = await Member.findOne({ email: email, isMember:true }, { recovery_question });
  if (!user) return next(createError("Cannot find this user", 404));
  if(recovery.isMatching(answer,user.recovery_question.answer)) {
      const newHashed = await hashPassword(password)
      const updated = await Member.findOneAndUpdate({email:email},{password:newHashed});
      if(updated) return response(res,"Updated Successfully",200) ; 
      return next(createError("Internal Server Error",500))
  }
  return next(createError("Invalid Recovery Question Answer",400));

};

module.exports = {
  registerUser,
  attendEvent,
  getLeaderboard,
  loginMember,
  recoverAccount
};
