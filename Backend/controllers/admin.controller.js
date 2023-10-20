const { MongooseError } = require("mongoose");
const { createError } = require("../errors/customError");
const Member = require("../models/member.model");
const { response } = require("../utils/response/Response");
const { lazyResponse } = require("../utils/response/LazyResponse");
const { deleteFromTable } = require("../utils/deleteFromTable");
const Event = require("../models/event.model");

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
    const registred = await Member.find({ isMember: false },{password:0});
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
    const members = await Member.find({ isMember: true },{password:0})
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
const confirmParticipation = async (req, res, next) => {
  const { members } = req.body;
  const { event_id } = req.body;
  if (!members)
    return next(createError("Please provide and Array of User's ID", 400));
  try {
    const event = await Event.findOne(
      { _id: event_id },
      { reward_point: 1, id: 1, registred: 1, participants:1 }
    );
    if(!event) next(createError("Cannot Find this Event",404))
    members.forEach(async (member) => {
      const mem = await Member.findOne({ _id: member }, { points: 1, _id: 1 });
      mem.points.week_point += event.reward_point;
      await Member.findOneAndUpdate({ _id: member }, mem);
    });
    event.registred=[]; 
    event.participants = members;
    await Event.findOneAndUpdate({ _id: event_id }, event);
    return response(res, "Confirmed Successfully", 200);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  registerMember,
  getAllRegistred,
  getAllMembers,
  deleteMember,
  confirmParticipation,
};
