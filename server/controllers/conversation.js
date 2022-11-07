const Conversation = require('../models/Convertsation')

const createConversation = async (req,res) => {
    try {
        const {senderId,receiverId} = req.body
        const getConv = await Conversation.find({
            members:[senderId,receiverId]
        })
        const getConv1 = await Conversation.find({
            members:[receiverId,senderId]
        })
        if(getConv.length === 0 && getConv1.length ===0 ){
        const newConversation = new Conversation({
            members:[senderId,receiverId]
        })
        await newConversation.save()
        res.status(201).json(newConversation)
    }else{
        return res.json({message:'This Conv is Alredy exist !!'})
    }
    } catch (error) {
        res.status(404).json(error)
    }
}

const deleteConversation = async (req,res) => {
    try {
        const {senderId,receiverId} = req.body
        const getConv = await Conversation.findOneAndDelete({
            members:[senderId,receiverId]
        })
        res.status(200).json(getConv)
    } catch (error) {
        res.status(404).json(error)
    }
}

const getSingleConversation /* of User */ = async (req,res) => {
    try {
        const {senderId,receiverId} = req.body
        const getConv = await Conversation.find({
            members:[senderId,receiverId]
        })
        res.status(200).json(getConv)
    } catch (error) {
        res.status(404).json(error)
    }
}

const getConversation /* of User */ = async (req,res) => {
    try {
        const {userId} = req.params
        const conversation = await Conversation.find({
            members: {$in :[userId]}
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = {createConversation,getConversation, getSingleConversation, deleteConversation}