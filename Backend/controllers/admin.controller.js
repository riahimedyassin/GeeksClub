const { createError } = require("../errors/customError");
const { response } = require("../utils/response/Response");
const Admin = require("../models/admin.model");
const { createToken } = require("../utils/token/createToken");
const {
  hashPassword,
  isMatchingPassword,
} = require("../utils/password/Password");
const signature = require('../utils/cloudinary/signUploadForm');
require('../utils/cloudinary/config');

const cloudinary = require('cloudinary').v2
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;



const getAdminInfo = async (req, res, next) => {
  try {
    const id = req.user;
    if (!id) return next(createError("Unauthorized", 403));
    const admin = await Admin.findOne({ _id: id });
    if (admin)
      return response(
        res,
        "Admin data retrieved successfully",
        200,
        false,
        admin
      );
    return next(createError("Not found", 404));
  } catch (error) {}
};

const changeInfo = async (req, res, next) => {
  const id = req.user;
  if (!id) return next(createError("Unauthorized", 403));
  const impossible = ["isSup"];
  const changes = Object.keys(req.body);
  if (!changes) return next(createError("No changes has been detected", 400));
  let index = 0;
  while (index < changes.length) {
    if (impossible.includes(changes[index]))
      return next(createError(`You can't change ${changes[index]}`, 400));
    index++;
  }
  try {
    const applyChanges = await Admin.findOneAndUpdate({ _id: id }, req.body);
    if (applyChanges)
      return response(res, "Changes has been saved succeessfully", 201);
    else {
      next(createError("Cannot save", 500));
    }
  } catch (error) {
    next(error);
  }
};
const registerAdmin = async (req, res, next) => {
  const id = req.user ; 
  const admin = req.body;
  admin.password = await hashPassword(admin.password);
  const user = await Admin.findOne({_id:id})
   if(!user.isSup) return next(createError("You are not authorized",403))
  Admin.create(admin)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.login(email, password);
    if (admin) {
      const token = createToken(admin);
      if (token)
        return response(res, "Logged in successfully", 200, true, token);
    }
    return next(createError("Invalid email or password", 403));
  } catch (error) {
    next(error);
  }
};
const deleteAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findOneAndDelete({ _id: id, isSup: false });
    if (admin) return response(res, "Admin Deleted successfuly", 204);
    return next(createError("Cannot find this admin", 404));
  } catch (error) {
    next(error);
  }
};
const changePassword = async (req, res, next) => {
  const id = req.user;
  const { password, newPassword } = req.body;
  console.log(req.body)
  if (!password || !newPassword)
    return next(
      createError("Provide the old and the new password please", 400)
    );
  try {
    const admin = await Admin.findOne({ _id: id }, { password: 1 });
    const isValid = await isMatchingPassword(admin.password, password);
    if (isValid) {
      const hashedNew = await hashPassword(newPassword);
      const done = await Admin.findOneAndUpdate(
        { _id: id },
        { password: hashedNew }
      );
      if (done) return response(res, "Password changed succussfully", 201);
      return next(createError("Cannot update password", 500));
    }
    return next(createError("Invalid password", 400));
  } catch (error) {
    next(error);
  }
};
const getAllAdmins=async(req,res,next)=> {
  try {
      const admins = await Admin.find({});
      if(admins) return response(res,'Admin list retireved succussfully',200,false , admins)
      return next(createError("Cannot retrieve the admin's list"))
  } catch (error) {
      next(error)
  }
}
const uploadAdminImage=async(req,res,next) => {
  const id = req.user ;
  const {link} = req.body ; 
  try {
      const admin = await Admin.findOneAndUpdate({_id:id},{picture:link})
      if(admin) return response(res,"Image uploaded successfully",200,false ,admin)
      return next(createError('Cannot save picture',500))
  } catch (error) {
      next(error)
  }
}
const getImageSignature=async(req,res,next) => {
  const {folderName} = req.params
  const sig = signature.signuploadform(folderName)
  res.json({
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudname: cloudName,
    apikey: apiKey
  })
}



module.exports = {
  changeInfo,
  getAdminInfo,
  registerAdmin,
  adminLogin,
  deleteAdmin,
  changePassword,
  getAllAdmins,
  uploadAdminImage,
  getImageSignature
};
