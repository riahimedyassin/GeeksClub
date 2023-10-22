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
const sendMessage=async(req,res,next) => {
    const id = req.user  ; 
    if(!id ) return next(createError("Unauthorized",403)) 
    const {forum} = req.params ; 
    const { message} = req.body
    if(!forum) return next(createError("Provide the forum id",400));
    if(!message) return next(createError("All fields are mandatory",400))
    try {
        const created = await Forum.findOne({_id:forum},{articles:1,members:1}) ; 
        if(created.members.includes(id)) {
            created.articles.push({message: {
                sent_by : id , 
                content : message.content , 
                date_sent : message.date_sent
            }});
            const done = await Forum.findOneAndUpdate({_id:forum},created)
            if(done) return response(res,"Article published successfully",201); 
            return next(createError("Unable to publish article",500));
        }
        return next(createError("You are not a member of this forum, subscribe first",403))
    } catch (error) {
        next(error)
    }
 }
const getAllForums=async(req,res,next) => {
    try {
        const getforum = await Forum.find({})
        if(getforum) return response(res,"Forum retrieved successfully",200,false,getforum)
        return next(createError("Cannot find the Forum",404))
    } catch (error) {
        next(error)
    }
}

const sendReply = async(req,res,next) => {
    const id = req.user ;
    if(!id) return next(createError("Unauthorized",403))
    const {reply} = req.body ; 
    const {message} = req.params ; 
    const {forum} = req.params ; 
    if(!reply) return next(createError("All fields are mandatory",400)) ; 
    if(!message || !forum) return next(createError("Provide the message && forum IDs",400)) ; 
    try {
        const getforum = await Forum.findOne({_id:forum},{articles:1}); 
        let index = 0 ;
        while(getforum.articles[index]._id!=message && index<getforum.articles.length) index++ ; 
        getforum.articles[index].replies.push({sent_by : id , content : reply.content , date_sent : reply.date_sent});
        const changed = await Forum.findOneAndUpdate({_id:forum},getforum)
        if(changed) return response(res,'Reply added successfully',201);
        return next(createError("Cannot add reply",500))
    } catch (error) {
        console.log(error)
        next(error)
    }
}





module.exports={
    addForum,
    subscribe,
    unsubscribe,
    sendMessage,
    sendReply,
    getAllForums
}