const Schema = require("mongoose").Schema;

const messageSchema = Schema(
  {
    sent_by: {
      type: String,
      required: [true, "Please enter the sender of the message"],
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
