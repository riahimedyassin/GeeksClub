
const { createError } = require("../errors/customError");
const Member = require("../models/member.model");
const { response } = require("../utils/response/Response");
const Event = require("../models/event.model");
const Admin = require("../models/admin.model");
const { createToken } = require("../utils/token/createToken");




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
  const impossible = ["name", "forname", "role", "isSup"];
  const changes = Object.keys(req.body);
  if (!changes) return next(createError("No changes has been detected", 400));
  let index = 0;
  while (index < changes.length) {
    if (impossible.includes(changes[index]))
      return next(createError(`You can't change ${changes[index]}`, 403));
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
  const admin = req.body;
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
    if(admin) {
      const token = createToken(admin)
      if (token) return response(res, "Logged in successfully", 200,true,token);
    }
    return next(createError("Invalid email or password", 403));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  changeInfo,
  getAdminInfo,
  registerAdmin,
  adminLogin,
};
