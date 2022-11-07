const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    creator:String,
    name:String,
    userImg:{
        type:String,
        default:''
    },
    desc : String,
    postPhoto : String,
    postLikes:{
        type:Array,
        default: []
    },
    postComments : {
        type:Array,
        default : []
    },createdAt : {
        type:Date,
        default: new Date()
    }
},{timestamps:true})

module.exports = mongoose.model('Post',postSchema)