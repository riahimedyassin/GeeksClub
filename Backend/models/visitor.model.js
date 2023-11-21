const mongoose = require("mongoose")


const visitorSchema = new mongoose.Schema({
    ip : {
        type: String , 
        required:true 
    },
    city : {
        type : String ,
        required : true 
    },
    region : {
        type : String ,
        required : true 
    },
    country : {
        type : String , 
        required : true 
    },
    count : {
        type: Number , 
        required : true ,
        default : 0
    }
})

module.exports= mongoose.model('Visitor',visitorSchema)