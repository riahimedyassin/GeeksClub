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
    const event = await Event.findOne({ _id: id, ended: false });
    if (!event)
      return next(createError("Event not found or already ended", 404));

    const bulkUpdateOps = [];

    for (let i = 0; i < event.participants.length; i++) {
      if (event.participants[i].participated) {
        const memberId = event.participants[i].user_id;
        const updateOperation = {
          updateOne: {
            filter: { _id: memberId },
            update: { $inc: { "points.week_point": event.reward_point } },
          },
        };
        bulkUpdateOps.push(updateOperation);
      }
    }

    // Execute bulk update
    if (bulkUpdateOps.length > 0) {
      await Member.bulkWrite(bulkUpdateOps);
    }

    // Update event status
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: id, ended: false },
      { ended: true },
      { new: true }
    );

    if (updatedEvent) {
      return response(
        res,
        "Event has ended successfully",
        200,
        false,
        updatedEvent
      );
    } else {
      return next(createError("Internal Server error", 500));
    }
  } catch (error) {
    next(error);
  }
};

const getFeaturedEvents = async (req, res, next) => {
  try {
    const events = await Event.find({}).limit(4);
    if (events) {
      return response(
        res,
        "Featured events retrieved successfully",
        200,
        false,
        events
      );
    }
    return next(createError("Error fetching events", 400));
  } catch (error) {
    next(error);
  }
};
const getUserEvents = async (req, res, next) => {
  const id = req.user;
  if (!id) return next(createError("Unauthorized", 403));
  try {
    const events = await Event.find({});
    const final = [];
    events.forEach((event) => {
      event.participants.forEach((participant) => {
        if (participant.user_id === id) final.push(event);
      });
    });
    if (!events) return next(createError("Cannot find events", 404));
    return response(res, "Events retrieved successfully", 200, false, final);
  } catch (error) {
    next(error);
  }
};
const addComment = async (req, res, next) => {
  const user_id = req.user;
  const { id } = req.params;
  const { content } = req.body;
  if (!user_id) return next(createError("Not authorized", 404));
  try {
    const user = await Member.findOne(
      { _id: user_id },
      { name: 1, forname: 1 }
    );
    const event = await Event.findOne({ _id: id });
    if (!event) return next(createError("Cannot find this event"));
    event.comments.push({
      content: content,
      id: user_id,
      name: user.name,
      forname: user.forname,
    });
    const done = await Event.findOneAndUpdate({ _id: event }, event);
    if (done)
      return response(res, "Comment added successfully", 200, false, event);
    return next(createError("Cannot add comment"));
  } catch (error) {
    next(error);
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
    const event = await Event.findOne({ _id: id }, { participants: 1 });
    if (event) {
      event.participants.push({ user_id, participated: false });
      const up = await Event.findOneAndUpdate(
        { _id: id },
        { participants: event.participants }
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
const quitEvent = async (req, res, next) => {
  const user_id = req.user;
  const { id } = req.params;
  if (!user_id) return next(createError("Unauthorized", 403));
  if (!id) return next(createError("Provide the form id", 400));
  try {
    const event = await Event.findOne({ _id: id });
    if (!event) return next(createError("Cannot find the event", 404));
    event.participants = event.participants.filter((e) => e.user_id != user_id);
    const done = await Event.findOneAndUpdate({ _id: id }, event);
    if (done) return response(res, "Quit successfully", 200, false, event);
    return next(createError("Cannot quit the event", 500));
  } catch (error) {
    next(error);
  }
};

const getLeaderboard = async (req, res, next) => {
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
  }
};
/**
 *
 * Takes the members list as a request body
 */

const confirmParticipation = async (req, res, next) => {
  const { id, user } = req.params;
  if (!user) return next(createError("Please provide a user ", 400));
  try {
    const event = await Event.findOne(
      { _id: id },
      { reward_point: 1, participants: 1 }
    );
    if (!event) next(createError("Cannot Find this Event", 404));
    let index = 0;
    while (
      event.participants[index].user_id != user &&
      event.participants.length < index
    )
      index++;
    if (index === event.participants.length)
      return next(createError("This member is not part of the event", 404));
    event.participants[index].participated = true;
    await Event.findOneAndUpdate({ _id: id }, event);
    return response(res, "Confirmed Successfully", 200, false, event);
  } catch (error) {
    next(error);
  }
};

const getEventsParticipants = async (req, res, next) => {
  const { id } = req.params;
  try {
    const finalParticipants = [];
    const event = await Event.findOne({ _id: id }, { participants: 1 });
    for (let i = 0; i < event.participants.length; i++) {
      const user = await Member.findOne({ _id: event.participants[i].user_id });
      if (user) finalParticipants.push(user);
    }
    return response(
      res,
      "Event's members retrieved succussfully",
      200,
      false,
      finalParticipants
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const deleteEvent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.findOneAndDelete({ _id: id });
    if (event) return response(res, "Event deleted succussfully", 204);
    return next(createError("Cannot find this event"));
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
  getFeaturedEvents,
  getUserEvents,
  addComment,
  attendEvent,
  quitEvent,
  getLeaderboard,
  confirmParticipation,
  getEventsParticipants,
  deleteEvent
};
