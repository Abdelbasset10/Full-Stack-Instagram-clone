const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:''
    },
    coverPicture:{
        type:String,
        default:''
    },
    followings:{
        type:Array,
        default:[]
    },
    followers:{
        type:Array,
        default:[]
    },
    country:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    bio:{
        type:String,
        default:''
    },
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)