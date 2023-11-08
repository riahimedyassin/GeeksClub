const cloudinary = require("cloudinary")


const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRECT,
    
}
cloudinary.v2.config(config)
module.exports =  cloudinary