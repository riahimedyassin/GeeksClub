const { MongooseError } = require("mongoose");
const { createError } = require("../errors/customError");
const Member = require("../models/member.model");
const { response } = require("../utils/response/Response");
const { lazyResponse } = require("../utils/response/LazyResponse");
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

const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});
    if (events)
      return response(res, "Events Retrieved Successfully", 200, false, events);
    return next(createError("Server Error"), 500);
  } catch (error) {
    next(error);
  }
};
const getEventByCategorie = async (req, res, next) => {
  try {
    const { categorie } = req.params;
    if (!categorie)
      return next(createError("Bad Request : Provide the categorie", 400));
    const events = await Event.find({ categorie: categorie.toLowerCase() });
    if (events)
      return response(
        res,
        `Events of the ${categorie} categorie has been retrieved `,
        200,
        false,
        events
      );
    return next(createError("Server Error", 500));
  } catch (error) {
    next(error);
  }
};
const addEvents = async (req, res, next) => {
  try {
    const event = req.body;
    const createdEvent = await Event.create(event);
    if (createError) {
      return response(res, "Event has been created successfully", 200, false, {
        eventid: createdEvent._id,
      });
    }
  } catch (error) {
    if (error instanceof MongooseError) return next(error);
    return next(createError("Uknown Error " + error, 500));
  }
};

module.exports = {
  registerMember,
  getAllRegistred,
  getAllMembers,
  deleteMember,
  getAllEvents,
  getEventByCategorie,
  addEvents,
};
