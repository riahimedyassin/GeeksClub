import { message } from "./message.type";

export type articleResponse = {
  _id : string , 
  message: message,
  replies: message[]
};
