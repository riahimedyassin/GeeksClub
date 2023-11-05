const Event = require("../models/event.model");
const { response } = require("../utils/response/Response");
const { MongooseError } = require("mongoose");
const { createError } = require("../errors/customError");
const Member = require("../models/member.model");

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
const getSingleEvent = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError("Please provide the ID of the event", 400));
  try {
    const event = await Event.findOne({ _id: id });
    if (event)
      return response(res, "Event retireved successfully", 200, false, event);
    return next(createError("Cannot find the event", 404));
  } catch (error) {
    next(error);
  }
};
const updateEvent = async (req, res, next) => {
  console.log("I'm called");
  const { id } = req.params;
  const changes = req.body;
  if (!id) return next(createError("Please provide the ID of the event", 400));
  try {
    const changed = await Event.findOneAndUpdate({ _id: id }, changes);
    if (changed)
      return response(
        res,
        "Event has been updated successfully",
        201,
        false,
        changed
      );
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

const endEvent = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError("Please provide the ID of the event", 400));
  try {
    const event = await Event.findOne(
      { _id: id },
      { participants: 1, reward_points: 1 }
    );
    if (!event) return next(createError("Event not found", 404));
    const participants = event["participants"];
    if (participants.length > 0) {
      participants.forEach(async (participant) => {
        if (participant.participated) {
          const week_point = await Member.findOne(
            { _id: participant },
            { points: 1 }
          ).select("week_point");
          await Member.findOneAndUpdate(
            { _id: participant },
            { week_point: week_point + event.reward_points }
          );
        }
      });
    }
    const del = await Event.findOneAndDelete({ _id: id });
    if (del) return response(res, "Deleted Successfully", 204);
    return next(createError("Server Error : Cannot Delete Event", 500));
  } catch (error) {
    next(error);
  }
};
const getFeaturedEvents = async (req, res, next) => {
  try {
    const events = await Event.find({} , {participants : 0}).limit(4);
    if (events)
      return response(
        res,
        "Featured events retrieved successfully",
        200,
        false,
        events
      );
    return next(createError("Error fetching events", 400));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEvents,
  getEventByCategorie,
  addEvents,
  getSingleEvent,
  updateEvent,
  endEvent,
  getFeaturedEvents
};
