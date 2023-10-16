const Schema = require("mongoose").Schema

const recoverySchema = Schema({
    question : {
        type: String , 
        required: [true,"Please enter the question"]
    },
    answer : {
        type: String,
        required: [true,"Please enter the answer for the question"]
    }
})

module.exports={recoverySchema}

