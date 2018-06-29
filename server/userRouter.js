const express = require('express')
const models = require('./model')
const User = models.getModel('user')
const Chat = models.getModel('chat')

const Router = express.Router()

const _filter = {'pwd':0,'__v':0}

Router.get('/info',(req,res)=>{
  const {userid} = req.cookies
  if( !userid ){
    return res.json({code:1,msg:'没有登录'})  
  } 
  User.findOne({_id:userid},_filter,(e,d)=>{
    if(e){
      return res.json({code:1,msg:'接口错误'})  
    }
    if(d){
      return res.json({code:0,result:d})  
    }
  })
})

Router.get('/list',(req,res)=>{
  const { type } = req.query
  User.find({type,title:{$exists:true}},_filter,(err,doc)=>{
    return res.json({code:0,result:doc})
  })
})

Router.post('/register',(req,res)=>{
  const { user, pwd, type } = req.body
  User.findOne({user},(e,d)=>{
    if(d){
      return res.json({code:1,msg:'用户已存在'})
    }
    User.create({user, pwd, type},(e,d)=>{
      return res.json({code:0})
    })
  })
})

Router.post('/login',(req,res)=>{
  const { user, pwd, type } = req.body
  User.findOne({user,pwd},_filter,(e,d)=>{
    if(d){
      const type = d.type
      res.cookie('userid',d._id)
      return res.json({code:0,result:d})
    }
    return res.json({code:1,msg:'用户名或密码错误'})
  })
})

Router.post('/update',(req,res)=>{
  const {userid} = req.cookies
  const body = req.body
  if( !userid ){
    return res.json({code:1,msg:'接口错误'})  
  } 
  User.findByIdAndUpdate(userid,body,{new:true},(e,d)=>{
    return res.json({code:0,result:d})
  })
})

Router.get('/getchatlist',(req,res)=>{
  const {userid} = req.cookies
  Chat.find({'$or':[{from:userid},{to:userid}]},(e,d)=>{
    return res.json({code:0,result:d})
  })
})

Router.get('/getUserById',(req,res)=>{
  const { userid } = req.query

  User.findOne({_id:userid},(e,d)=>{
    if(e){
      return res.json({code:1,msg:'接口错误'})  
    }
    return res.json({code:0,result:d})
  })
})

module.exports = Router