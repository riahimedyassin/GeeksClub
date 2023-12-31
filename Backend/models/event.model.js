const { default: mongoose } = require("mongoose")
const { dateSchema } = require("./abstract/date.model")

const Schema = require("mongoose").Schema


const eventSchema = Schema({
    picture : {
        type : String , 
        required : false 
      },
    title : {
        type: String , 
        required : [true,"Please enter the event name"]
    },
    descreption : {
        type: String ,
        required:[true,"Please enter the event descreption"],
        maxlength: [1000,"Descreption should not exceed 500 caracter"]
    },
    price : {
        type: Number , 
        required : [true,"Please enter the event price , If it is free , enter 0"]
    },
    reward_point: {
        type : Number ,
        required:[true,"Please enter the reward points from 5 -> 50 Max Point"],
        min:  [5,"Minimum event's points is 5"],
        max: [50,"Maximum event's points is 50"]
    },
    date : {
        type : dateSchema,
        required: true 
    },
    ended : {
        type: Boolean ,
        default:false 
    },
    prerequis : {
        type : Array,
        required:[true,"Please enter the prerequis knowledge for those who wants to participate"]
    },
    categorie : {
        type: String , 
        enum : ["formation","assignment","event","reunion"],
        required : [true,"Please enter the categorie of this event"]
    },
    participants: {
        type:[{
            user_id : {
                type : String ,
                required : [true  , "Please provide the user's ID"]
            },
            participated : {
                type : Boolean , 
                default : false 
            }
        }],
        default:[]
    },
    comments : {
        type: [{content : String , name : String , forname : String , id : String }]
    }
})

module.exports=mongoose.model("Event",eventSchema)