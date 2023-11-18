const express = require("express");
const app = express();
const { connect } = require("./config/connect");
require("dotenv").config({
  path: "env/dev.env",
});
const cors = require("cors");

const PORT = process.env.PORT;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const adminRoute = require("./routes/admin.route");
const memberRoute = require("./routes/member.route");
const eventRoute = require("./routes/event.route");
const forumRoute = require("./routes/forum.route");
const articleRoute = require("./routes/article.route");
const errorHandler = require("./middlewares/errorHandler");
const { default: helmet } = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");


app.disable('x-powered-by');
app.use(express.json());
app.use(helmet())
// app.use(rateLimit({
//   max: 200 ,
//   windowMs : 15*60*1000
// }))
app.use(hpp())
app.use(express.urlencoded({extended:false}))
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);
app.use("/api/geeks/dashboard", adminRoute);
app.use("/api/geeks/members", memberRoute);
app.use("/api/geeks/events", eventRoute);
app.use("/api/geeks/forums", forumRoute);
app.use("/api/geeks/articles", articleRoute);
app.use(errorHandler);

const run = async () => {
  try {
    if (PORT === undefined || isNaN(PORT)) {
      throw new Error("Set up the SERVER PORT CORRECTLY in your ENV");
    }
    if (CONNECTION_STRING === undefined) {
      throw new Error("Set up your MongoDB Connection String in your ENV");
    }
    await connect(CONNECTION_STRING);
    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  } catch (error) {
    console.log(`Server Failed To Run. Error : ${error}`);
  }
};

run();
