const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const models = require('./model')
const Chat = models.getModel('chat')

const app = express()

const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection',function(socket){
    socket.on('sendMsg',(data)=>{
        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},(e,d)=>{
            io.emit('recvMsg',d)
        })
    })
})


const userRouter = require('./userRouter')

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user',userRouter)

server.listen('9500',()=>{
    console.log('running in 9500')
})