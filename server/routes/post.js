const express = require('express')
const router = express.Router()

const {getAllPosts, getTimelinePosts, getUserPosts, createPost, updatePost, deletePost, likeDislikePost} = require('../controllers/post')
const auth = require('../middleware/auth')

router.get('/',auth,getAllPosts)
router.get('/:id',auth,getTimelinePosts)
router.get('/userPosts/:id',auth,getUserPosts)
router.post('/',auth,createPost)
router.patch('/updatePost/:id',auth,updatePost)
router.delete('/deletePost/:id',auth,deletePost)
router.patch('/likeDislikePost/:id',auth,likeDislikePost)

module.exports = router