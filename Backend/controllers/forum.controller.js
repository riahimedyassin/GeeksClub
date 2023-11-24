const { MongooseError } = require("mongoose");
const Forum = require("../models/forum.model");
const { response } = require("../utils/response/Response");
const { createError } = require("../errors/customError");
const { deleteFromTable } = require("../utils/deleteFromTable");
const Member = require("../models/member.model");

const addForum = async (req, res, next) => {
  const { name, descreption } = req.body;
  try {
    const forum = await Forum.create({ name, descreption });
    if (forum)
      return response(res, "Forum created successfully", 200, false, forum);
    return next(createError("Cannot create forum", 500));
  } catch (error) {
    if (error instanceof MongooseError) return next(error);
    next(error);
  }
};
const subscribe = async (req, res, next) => {
  const id = req.user;
  const { forum } = req.body;
  if (!forum) return next(createError("Provide the forum ID", 400));
  if (!id) return next(createError("Unauthorized", 403));
  try {
    const user = await Member.findOne({ _id: id });
    user.forums.push(forum);
    const doneUser = await Member.findOneAndUpdate({ _id: id }, user);
    if (!doneUser)
      return next(createError("Could not subscribe to this forum", 405));
    const grtforum = await Forum.findOne({ _id: forum }, { members: 1 });
    if (grtforum) {
      grtforum.members.push(id);
      const done = await Forum.findOneAndUpdate(
        { _id: forum },
        { members: grtforum.members }
      );
      return done
        ? response(res, "Subscribed successfully", 200)
        : next(createError("Cannot subscribe", 500));
    }
    return next(createError("Cannot find this forum", 404));
  } catch (error) {
    next(error);
  }
};
const unsubscribe = async (req, res, next) => {
  const id = req.user;
  const { forum } = req.body;
  if (!forum) return next(createError("Provide the forum ID", 400));
  if (!id) return next(createError("Unauthorized", 403));
  try {
    const getforum = await Forum.findOne({ _id: forum });
    if (!getforum) return next(createError("Cannot find this forum", 404));
    getforum.articles.filter((article) => {
      return article.sent_by.user_id != id;
    });
    getforum.members = deleteFromTable(getforum.members, id);
    const changes = await Forum.findOneAndUpdate({ _id: forum }, getforum);
    const user = await Member.findOne({ _id: id });
    user.forums = deleteFromTable(user.forums, forum);
    const done = await Member.findOneAndUpdate({ _id: id }, user);
    if (changes && done) return response(res, "Deleted successfully", 204);
    return next(createError("Cannot delete this member", 500));
  } catch (error) {
    next(error);
  }
};
const sendMessage = async (req, res, next) => {
  const id = req.user;
  if (!id) return next(createError("Unauthorized", 403));
  const { forum } = req.params;
  const { message } = req.body;
  if (!forum) return next(createError("Provide the forum id", 400));
  if (!message) return next(createError("All fields are mandatory", 400));
  try {
    const created = await Forum.findOne(
      { _id: forum },
      { articles: 1, members: 1 }
    );
    if (created.members.includes(id)) {
      const user = await Member.findOne({ _id: id }, { name: 1, forname: 1 });
      created.articles.push({
        message: {
          sent_by: { user_id: id, name: user.name, forname: user.forname },
          content: message.content,
          date_sent: Date.now,
        },
      });
      const done = await Forum.findOneAndUpdate({ _id: forum }, created);
      if (done)
        return response(
          res,
          "Article published successfully",
          200,
          false,
          created.articles
        );
      return next(createError("Unable to publish article", 500));
    }
    return next(
      createError("You are not a member of this forum, subscribe first", 403)
    );
  } catch (error) {
    next(error);
  }
};
const getAllForums = async (req, res, next) => {
  try {
    const getforum = await Forum.find({});
    if (getforum)
      return response(
        res,
        "Forum retrieved successfully",
        200,
        false,
        getforum
      );
    return next(createError("Cannot find the Forum", 404));
  } catch (error) {
    next(error);
  }
};

const sendReply = async (req, res, next) => {
  const id = req.user;
  if (!id) return next(createError("Unauthorized", 403));
  const { reply } = req.body;
  const { message } = req.params;
  const { forum } = req.params;
  if (!reply) return next(createError("All fields are mandatory", 400));
  if (!message || !forum)
    return next(createError("Provide the message && forum IDs", 400));
  try {
    const getforum = await Forum.findOne({ _id: forum }, { articles: 1 });
    let index = 0;
    while (
      getforum.articles[index]._id != message &&
      index < getforum.articles.length
    )
      index++;
    if (index === getforum.articles.length)
      return next(createError("Message not found", 404));
    const user = await Member.findOne({ _id: id }, { name: 1, forname: 1 });
    getforum.articles[index].replies.push({
      sent_by: {
        user_id: id,
        name: user.name,
        forname: user.forname,
      },
      content: reply,
      date_sent: Date.now(),
    });
    const changed = await Forum.findOneAndUpdate({ _id: forum }, getforum);
    if (changed)
      return response(
        res,
        "Reply added successfully",
        200,
        false,
        getforum.articles
      );
    return next(createError("Cannot add reply", 500));
  } catch (error) {
    next(error);
  }
};

const getSingleForum = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError("Provide the Forum ID", 400));
  try {
    const forum = await Forum.findOne({ _id: id });
    if (forum)
      return response(res, "Forum retrieved successfully", 200, false, forum);
    return next(createError("Cannot find ths forum", 404));
  } catch (error) {
    next(error);
  }
};
const getUserEvents = async (req, res, next) => {
  const id = req.user;
  try {
    const user = await Member.findOne({ _id: id });
    const forums = [];
    for (let i = 0; i < user.forums.length; i++) {
      const frm = await Forum.findOne({ _id: user.forums[i] });
      forums.push(frm);
    }
    return response(res, "Forums retrieved successfully", 200, false, forums);
  } catch (error) {
    next(error);
  }
};
const updateForums = async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const forum = await Forum.findOneAndUpdate({ _id: id }, changes);
    if (forum) {
      return response(res, "Forum updated successfully", 201);
    }
    return next(createError("Cannot find this forum", 404));
  } catch (error) {
    next(error);
  }
};
const deleteForum = async (req, res, next) => {
  const { id } = req.params;
  try {
    const forum = await Forum.findOneAndDelete({ _id: id });
    const members = await Member.find({});
    for (let i = 0; i < members.length; i++) {
      if (members[i].forums.includes(id)) {
        members[i].forums = deleteFromTable(members[i].forums, id);
        const update = await Member.findOneAndUpdate({ _id: members[i]._id },members[i]);
      }
    }
    if (forum) return response(res, "Forum deleted succussfully", 204);
    return next(createError("Cannot find this forum", 404));
  } catch (error) {
    
    next(error);
  }
};

module.exports = {
  addForum,
  subscribe,
  unsubscribe,
  sendMessage,
  sendReply,
  getAllForums,
  getSingleForum,
  getUserEvents,
  updateForums,
  deleteForum,
};
