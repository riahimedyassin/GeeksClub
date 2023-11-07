
const mongoose=require('mongoose')


const articleSchema = new mongoose.Schema({
    title : {
        type : String , 
        required : [true,"Please enter the article title"]
    },
    content: {
        type : String , 
        required:[true, "Please enter the content of the article"]
    },
    picture : {
        type : String , 
        required: false 
    }
})


module.exports=mongoose.model("Article",articleSchema)