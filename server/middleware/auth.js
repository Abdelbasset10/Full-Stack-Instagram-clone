const jwt = require('jsonwebtoken')

const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(token){
            const payload = jwt.verify(token,'JWT_SECRET')
            req.userId = payload?.id 
            req.userName = payload?.userName
            req.userImg = payload?.userImg
        }else{
            console.log('There is no token !!')
        }
        next()
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = auth