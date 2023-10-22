const Schema = require("mongoose").Schema;
const { default: mongoose } = require("mongoose");
const {message} = require("./abstract/message.model")

const forumSchema = Schema({
    name : {
        type: String , 
        required: [true,"Please enter in the forum name"]
    },
    descreption : {
        type:String , 
        required:[true,"Please enter the forums descreption"]
    },
    members : [{type: String}],
    articles : [{type:message}]

})


module.exports=mongoose.model("Forum",forumSchema)