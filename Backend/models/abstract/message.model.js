const Schema = require("mongoose").Schema;

const messageSchema = Schema(
  {
    sent_by: {
      user_id : {
        type : String ,
        required : [true,"Enter the member's ID"]
      },
      name : {
        type : String 
      },
      forname : {
        type : String 
      }
    },
    content: {
      type: String,
      required: [true, "Messages cannot be empty"],
      maxlength: [300, "Messages cannot exceed 300 caracters"],
    },
  },
  {
    timestamps: true,
  }
);
const message = Object.assign(
  { replies: [{ type: messageSchema }] },
  { message: { type: messageSchema } }
);

module.exports = { message };
