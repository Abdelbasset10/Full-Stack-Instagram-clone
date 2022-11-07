const io = require('socket.io')(8900,{ // 8900 : port of socket io 
    cors:{
        origin:'http://localhost:3000'
    }
})

let users = []

const addUser = (userId,socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
}

const getUser = (userId) => {
    return users.find((user)=>user.userId===userId)
}

const deleteUser = (socketId) => {
    users = users.filter((user)=>user.socketId !== socketId)
}

// connecion event : 
io.on("connection",(socket)=>{
    console.log('user is connecting')
    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id)
        console.log(users)
        io.emit("getOnlineUsers",users)
        
    })

    socket.on("sendMessage",({senderId,receiverId,text})=>{
        console.log(users)
        const user = getUser(receiverId)
        console.log(receiverId)
        console.log(user.socketId)
        io.to(user.socketId).emit("getMessage",{senderId,text})
    })

    socket.on("disconnect",()=>{
        console.log("user disconnect")
        deleteUser(socket.id)
        io.emit("getOnlineUsers",users)
    })
})
