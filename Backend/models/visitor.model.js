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
    }
})

module.exports= mongoose.model('Visitor',visitorSchema)