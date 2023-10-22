const { MongooseError, get } = require("mongoose");
const Forum = require("../models/forum.model")
const {response} =require("../utils/response/Response")
const {createError} = require("../errors/customError");
const { deleteFromTable } = require("../utils/deleteFromTable");

const addForum = async(req,res,next) => {
    try {
        const forum = await Forum.create(req.body);
        if(forum) return  response(res,"Forum created successfully",200,false,forum)
        return next(createError("Cannot create forum",500))
    } catch (error) {
        if(error instanceof MongooseError) return  next(error);
        next(error);
    }
}
const subscribe = async(req,res,next) => {
    const id = req.user ; 
    const {forum} = req.body
    if(!forum) return next(createError("Provide the forum ID",400))
    if(!id) return next(createError("Unauthorized",403))
    try {
        const grtforum = await Forum.findOne({_id:forum},{members:1})
        if(grtforum) {
            grtforum.members.push(id); 
            const done = await Forum.findOneAndUpdate({_id:forum},{members:grtforum.members})
            return done ? response(res,"Subscribed successfully",200) : next(createError("Cannot subscribe",500))
        };
        return next(createError("Cannot find this forum",404))

    } catch (error) {
        console.log(error)
        next(error)
    }
}
const unsubscribe=async(req,res,next) => {
    const id = req.user ; 
    const {forum} = req.body 
    if(!forum) return next(createError("Provide the forum ID",400))
    if(!id) return next(createError("Unauthorized",403));
    try {
        const getforum = await Forum.findOne({_id:forum})
        if(!getforum) return next(createError("Cannot find this forum",404))
        getforum.articles.filter(article=> {
            return article.sent_by!=id
        })
        getforum.members=deleteFromTable(getforum.members,id);
        const changes = await Forum.findOneAndUpdate({_id:forum},getforum);
        if(changes) return response(res,"Deleted successfully",204)
        return next(createError("Cannot delete this member",500))
        
    } catch (error) {
        console.log(error)
        next(error)
    }

}

module.exports={
    addForum,
    subscribe,
    unsubscribe
}