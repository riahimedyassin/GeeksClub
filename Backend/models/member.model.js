const { default: mongoose } = require("mongoose");
const { Validator } = require("../utils/validators/Validator");
const { pointSchema } = require("./abstract/point.model");
const { addressSchema } = require("./abstract/address.model");
const { recoverySchema } = require("./abstract/recovery.model");
const validation = new Validator();
const { isMatchingPassword } = require("../utils/password/Password");
const jwt = require("jsonwebtoken");

const Schema = require("mongoose").Schema;
const memberSchema = Schema({
  picture: {
    type : String , 
    required: false
  },
  isMember: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    maxlength: [20, "Name Length Should not excced 20 caracter"],
  },
  forname: {
    type: String,
    required: [true, "Please Enter your forname"],
    maxlength: [20, "Forname Lengtth Should not excced 20 caracter"],
  },
  age: {
    type: Number,
    required: [true, "Please Enter your age"],
    min: [16, "You should be above 16 Years Old"],
    max: [30, "Grandpa ? You must be under 30 Years Old"],
  },
  CIN: {
    type: Number,
    required: [true,"Please provide your CIN Number"],
    min : [100000,"Please provide a valid CIN Number"]
  },
  email: {
    type: String,
    required: [true, "Enter your email please"],
    validate: {
      validator: validation.email,
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [7, "Password length should be at least 7 caracter long "],
    maxlength: [60, "Password length should not excced 60 caracter"],
  },
  points: {
    type: pointSchema,
    required: false,
    default: { week_point: 0, global_point: 0 },
  },
  address: {
    type: addressSchema,
    required: [true,"Please provide a valid address"],
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
  recovery_question: {
    type: recoverySchema,
    required: true,
  },
  forums : {
    type : [{type:String}],
    default : [] 
  }
});
memberSchema.statics.login = async function (email, password) {
  const member = await this.findOne(
    { email, isMember:true },
    { email: 1, _id: 1, password: 1 }
  );
  if (!member) return null;
  const valid = await isMatchingPassword(member.password, password);
  if (valid) {
    return member.id;
  }
  return null;
};



module.exports = mongoose.model("Member", memberSchema);
