const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema(
    {
        userName:String,
        password:String
    }
)

module.exports = mongoose.model('login',EventSchema)