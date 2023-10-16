const Schema = require("mongoose").Schema

const addressSchema = Schema({
    city : {
        type: String , 
        required: [true,"Please enter your ciry"]
    },
    country : {
        type: String,
        default:"Tunisia"
    },
    region : {
        type : String ,
        required:[true,"Please enter your region"] 
    }
})

module.exports={addressSchema}

