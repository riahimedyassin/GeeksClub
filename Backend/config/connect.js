const mongoose = require("mongoose")

const connect=async (connection_string)=> {
    try {
        const db = await mongoose.connect(connection_string)
        if(db) console.log('Connected Successfully to DB')
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={connect}