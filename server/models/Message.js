const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    conversationId:String,
    senderId:String,
    text:String
},{timestamps:true})

module.exports = mongoose.model('Message',MessageSchema)