const Schema = require("mongoose").Schema;
const { default: mongoose } = require("mongoose");
const { Validator } = require("../utils/validators/Validator");
const { isMatchingPassword } = require("../utils/password/Password");

const adminSchema = Schema({
  picture : {
    type : String , 
    required : false 
  },
  name: {
    type: String,
    required: [true, "Please enter the admin name"],
  },
  forname: {
    type: String,
    required: [true, "Please enter the admin forname"],
  },
  age: {
    type: Number,
    required: [true, "Please enter the admin age"],
  },
  role: {
    type: String,
    enum: ["President", "Vice President", "VP Media" , "VP Dev" , "VP RH" , "Assistant Media","Asistant Dev","Assistant RH"],
    required: [
      true,
      "Please enter the admin role : President / Vice Presidentt / Other",
    ],
  },
  email: {
    type: String,
    required: [true, "Please enter the admin email"],
    // validate: {
    //   validator: [validate.email],
    // },
  },
  password: {
    type: String,
    required: [true, "Please enter the admin password"],
  },
  isSup: {
    type: Boolean,
    default: false,
    required: false,
    //Set up the sup by hand in the DB to avoid problems (This field is only manipulated by the DB Owner)
  },
  phone: {
    type: String,
    maxlength: [8, "Phone Number should be 8 numbers"],
    minlength: [8, "Phone Number should be 8 numbers"],
    required: [true, "Please enter your phone Number"],
  },
  facebook: {
    type: String,
    required: [true, "Please enter your facebook profile link"],
  },
});

adminSchema.statics.login = async function (email, password) {
  try {
    const admin = await this.findOne(
      { email: email },
      { email: 1, password: 1, _id: 1 }
    );
    if (admin) {
      const pass = await isMatchingPassword(admin.password, password);
      if (pass) {
        return admin.id;
      }
      return null;
    }
    return null;
  } catch (error) {
    return null;
  }
};

module.exports = mongoose.model("Admin", adminSchema);
