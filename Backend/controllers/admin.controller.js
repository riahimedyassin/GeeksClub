const { createError } = require("../errors/customError");
const { response } = require("../utils/response/Response");
const Admin = require("../models/admin.model");
const { createToken } = require("../utils/token/createToken");
const {
  hashPassword,
  isMatchingPassword,
} = require("../utils/password/Password");




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
  if(!req.body ) return next(createError("No changes has been detected", 400));
  if (!id) return next(createError("Unauthorized", 403));
  const changes = Object.keys(req.body);
  if(changes.includes("isSup")) return next(createError(`You can't change the Sup of an admin , you need access to DB`, 400));
  try {
    const applyChanges = await Admin.findOneAndUpdate({ _id: id }, req.body);
    if (applyChanges) return response(res, "Changes has been saved succeessfully", 201);
    return next(createError("Cannot save", 500));
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
        return response(res,"Admin created succussfully",200,false,data)
    })
    .catch((err) => {
        return next(err)
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
    return next(createError("Invalid email or password", 400));
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
     return next(error);
  }
};
const changePassword = async (req, res, next) => {
  const id = req.user;
  const { password, newPassword } = req.body;
  if (!password || !newPassword)
    return next(
      createError("Please Provide the old and the new password", 400)
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
      return next(createError("Internal Servor Error", 500));
    }
    return next(createError("Invalid password", 400));
  } catch (error) {
    return next(error);
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
const getSingleAdmin=async(req,res,next) => {
  const {id} = req.params ; 
  try {
      const admin = await Admin.findOne({_id:id});
      if(admin) return response(res,"Admin retrieved succussfullu",200,false,admin)
      return next(createError("Admin not found",404))
  } catch (error) {
      next(error)
  }
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
  getSingleAdmin
};
