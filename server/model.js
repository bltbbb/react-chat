const mongoose = require('mongoose')

//链接mongodb
const DB_URL = 'mongodb://127.0.0.1:27017/redux-chat'
mongoose.connect(DB_URL)

const models = {
    user:{
        'user': {'type':String,require:true},
        'pwd': {'type':String,require:true},
        'type': {'type':String,require:true},
        'avatar': {'type':String},
        'desc': {'type':String},
        'title': {'type':String},
        // boss独有
        'company': {'type':String},
        'money': {'type':String},
    },
    chat:{
        'chatid': {'type':String,'require':true},
        'from': {'type':String,'require':true},
        'to': {'type':String,'require':true},
        'read': {'type':Boolean,default:false},
        'content': {'type':String,'require':true},
        'creat_time': {'type':Number,'default':new Date().getTime()},
    }
}

for( m in models ){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}