const Message = require('../models/Message')

const createMessage = async (req,res) => {
    try {
        const {conversationId,senderId,text} = req.body
        const newMessage = new Message({
            conversationId,senderId,text
        })
        await newMessage.save()
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(404).json(error)
    }
}

const getMessagesOfConversation = async (req,res) => {
    try {
        const {idConversation} = req.params
        const messages = await Message.find({conversationId:idConversation})
        res.status(200).json(messages)
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = {createMessage,getMessagesOfConversation}