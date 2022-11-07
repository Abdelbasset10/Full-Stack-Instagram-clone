const express = require('express')
const router = express.Router()

const {createConversation,getConversation, getSingleConversation, deleteConversation} = require('../controllers/conversation')
const auth = require('../middleware/auth')

router.post('/',auth,createConversation)
router.get('/',auth,getSingleConversation)
router.get('/:userId',auth,getConversation)
router.delete('/',auth,deleteConversation)

module.exports = router