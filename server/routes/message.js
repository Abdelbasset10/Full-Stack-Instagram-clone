const express = require('express')
const router = express.Router()

const {createMessage,getMessagesOfConversation} = require('../controllers/message')
const auth = require('../middleware/auth')


router.post('/',auth,createMessage)
router.get('/:idConversation',auth,getMessagesOfConversation)

module.exports = router