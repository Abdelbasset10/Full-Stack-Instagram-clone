const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const signUp = async (req,res) => {
    try {
        const existUser = await User.findOne({email:req.body.email})
        if(existUser){
            return res.json({message:'This Email is already exist...'})
        }
        if(req.body.password !== req.body.confirmPassword){
            return res.json({message:'passwords are incorrect'})
        }
        const hashPassword = await bcrypt.hash(req.body.password,12)
        const newUser = new User({
            ...req.body,password:hashPassword
        })
        await newUser.save()
        const token = jwt.sign({id:newUser._id,userName:newUser.userName,userImg:newUser.profilePicture},'JWT_SECRET',{expiresIn:'30d'})
        res.status(201).json({user:newUser,token})
        
    } catch (error) {
        res.status(404).json(error)
    }
}

const signIn = async (req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.json({message:'You have to fill email and password'})
        }
        const existUser = await User.findOne({email})
        if(!existUser){
            return res.json({message:'This Email does not exist...'})
        }
        const isCorrectPassword = await bcrypt.compare(password,existUser.password)
        if(!isCorrectPassword){
            return res.json({message:'Password is incorrect'})
        }
        const token = jwt.sign({id:existUser._id,userName:existUser.userName,userImg:existUser.profilePicture},'JWT_SECRET',{expiresIn:'30d'})
        res.json({user:existUser,token})
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = {signUp, signIn}