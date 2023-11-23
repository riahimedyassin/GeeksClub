const signature = require('../utils/cloudinary/signUploadForm');
require('../utils/cloudinary/config');

const cloudinary = require('cloudinary').v2
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;


const getImageSignature=async(req,res,next) => {
    const {folderName} = req.params
    const sig = signature.signuploadform(folderName)
    res.status(200).json({
      signature: sig.signature,
      timestamp: sig.timestamp,
      cloudname: cloudName,
      apikey: apiKey
    })
  }


  module.exports={getImageSignature}