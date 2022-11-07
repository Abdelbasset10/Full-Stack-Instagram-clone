const express = require('express')
const router = express.Router()

const {getUser, getAllUsers, followUser, unFollowUser, updateUser, deleteUser} = require('../controllers/user')
const auth = require('../middleware/auth')

router.get('/:id',auth,getUser)
router.get('/',getAllUsers)
router.patch('/follow/:id',auth,followUser)
router.patch('/unfollow/:id',auth,unFollowUser)
router.patch('/updateUser/:id',auth,updateUser)
router.delete('/deleteUser/:id',auth,deleteUser)


module.exports = router