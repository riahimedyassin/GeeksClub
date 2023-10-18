const express = require('express')
const app = express()
const {connect}= require("./config/connect")
require("dotenv").config()


const PORT = process.env.PORT
const CONNECTION_STRING = process.env.CONNECTION_STRING

const adminRoute = require("./routes/admin.route")
const memberRoute = require("./routes/member.route")
const eventRoute = require("./routes/event.route")
const errorHandler = require('./middlewares/errorHandler')


app.use(express.json())
app.use("/api/geeks/dashboard",adminRoute)
app.use("/api/geeks/member",memberRoute)
app.use("/api/geeks/events",eventRoute)
app.use(errorHandler)



const run=async ()=> {
    try {
        if(PORT===undefined || isNaN(PORT)) {
            throw new Error("Set up the SERVER PORT CORRECTLY in your ENV")
        }
        if(CONNECTION_STRING===undefined) {
            throw new Error("Set up your MongoDB Connection String in your ENV")
        }
        await connect(CONNECTION_STRING)
        app.listen(PORT,()=> {
            console.log(`Server Running on Port ${PORT}`)
        })
    } catch (error) {
        console.log(`Server Failed To Run. Error : ${error}`)
    }
}

run()