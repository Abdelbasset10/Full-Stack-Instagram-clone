const Post = require('../models/post')
const User = require('../models/user')

const getAllPosts = async (req,res) => {
    try {
        const allPosts = await Post.find({})
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(404).json(error)
    }
}

const getTimelinePosts = async (req,res) => {
    try {
        const {id} = req.params
        const currentUser = await User.findById(id)
        const currentUserPosts = await Post.find({creator:currentUser._id})
        const followingsPosts = await Promise.all(
            currentUser.followings.map((freind)=>{
                return Post.find({creator:freind})
            })
        )
        res.status(200).json(currentUserPosts.concat(...followingsPosts))
    } catch (error) {
        res.status(404).json(error)
    }
}


const getUserPosts = async (req,res) => {
    try {
        const {id} = req.params
        const getPostUser = await Post.find({creator:id})
        res.status(200).json(getPostUser)
    } catch (error) {
        res.status(404).json(error)
    }
}

const createPost = async (req,res) => {
    try {
        const newPost = new Post({...req.body,creator:req.userId,name:req.userName,userImg:req.userImg,createdAt: new Date().toISOString()})
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(404).json(error)
    }
}

const updatePost = async (req,res) => {
    try {
        const {id} = req.params
        const getPostAndUpdate = await Post.findByIdAndUpdate(id,{...req.body},{new:true})
        if(!getPostAndUpdate){
            return res.status(404).json({message:'This Post does not exist'})
        }
        res.json({message:'The post has been updated'})
    } catch (error) {
        res.status(404).json(error)
    }
}

const deletePost = async (req,res) => {
    try {
        const {id} = req.params
        await Post.findByIdAndDelete(id)
        res.json({message:'The post has been deleted'})
    } catch (error) {
        res.status(404).json(error)
    }
}

const likeDislikePost = async (req,res) => {
    try {
        const {id} = req.params
        const {user} = req.body
        const getPost = await Post.findById(id)
        if(!getPost.postLikes.includes(user)){
            await getPost.updateOne({$push : {postLikes : user}})
            return res.status(200).json({message:'The post has been liked'})
        }else{
            await getPost.updateOne({$pull : {postLikes : user}})
            return res.status(200).json({message:'The post has been disliked'})
        }
    } catch (error) {
        res.status(404).json(error)
}
}

module.exports = {getAllPosts,  getTimelinePosts, getUserPosts, createPost, updatePost, deletePost, likeDislikePost}