const Schema = require("mongoose").Schema

const messageSchema = Schema({
    sent_by : {
        type: String , 
        required:[true,"Please enter the sender of the message"]
    },
    date_sent : {
        type: Date,
        required:[true,"Please enter the data this message was sent"]
    },
    content : {
        type : String , 
        required:[true,"Messages cannot be empty"],
        maxlength:[300,"Messages cannot exceed 300 caracters"]
    }
})
const message = Object.assign({replies: {type: messageSchema}},{messageSchema})


module.exports={message}

