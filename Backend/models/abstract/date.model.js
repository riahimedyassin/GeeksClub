const { default: mongoose } = require("mongoose")

const Schema = require("mongoose").Schema


const dateSchema = Schema({
    date_start : {
        type : Date ,
        required: [true,"Please enter the start date"]
    },
    date_end: {
        type: Date , 
        required:[true,"Please enter the end date"]
    }
})

module.exports={dateSchema}