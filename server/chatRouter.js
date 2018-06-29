const express = require('express')
const models = require('./model')
const Chat = models.getModel('chat')

const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection',function(socket){
    socket.on('sendMsg',(data)=>{
        console.log(data)
        io.emit('recMsg',data)
    })
})

const Router = express.Router()
