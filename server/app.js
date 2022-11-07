require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")

const app = express()

const connectDB = require('./db/connectDB')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const conversationRouter = require('./routes/conversation')
const messageRouter = require('./routes/message')


app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))



app.use('/auth',authRouter)
app.use('/post',postRouter)
app.use('/user',userRouter)
app.use('/messenger',conversationRouter)
app.use('/messenger/chat',messageRouter)


const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT,()=>{
            console.log(`Server is starting on PORT ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()