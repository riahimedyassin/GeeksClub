const Schema = require("mongoose").Schema

const pointSchema = Schema({
    week_point : {
        type: Number , 
        default: 0
    },
    global_point : {
        type: Number,
        default : 0
    }
})

module.exports={pointSchema}

