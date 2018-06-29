import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9500')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
    msgList: [],
    unRead: 0
}

//REDUCER
export function chat(state=initState,action){
    switch (action.type) {
        case MSG_LIST:
            return {...state,msgList:action.payload,unRead:action.payload.filter(v=>(!v.read)&&(v.from !== action.userid)).length}
        case MSG_RECV:
            return {...state,msgList:[...state.msgList,action.payload],unRead:action.payload.from !== action.userid ? state.unRead+1 : state.unRead }
        default:
            return state
    }
}

function chatlist(data,userid){
    return {userid,type:MSG_LIST,payload:data}
}

function msgRecv(data,userid){
    return {userid,type:MSG_RECV,payload:data}
}

export function recvMsg(){
    return (dispatch,getState)=>{
        socket.on('recvMsg',(data)=>{
            const userid = getState().user._id
            dispatch(msgRecv(data,userid))
        })
    }
}

export function sendMsg(data){
    return ()=>{socket.emit('sendMsg',data)}
}

export function getChatList(){
    return (dispatch,getState)=>{
        axios.get('/user/getchatlist').then(res=>{
            if(res.status === 200 && res.data.code === 0){
                const userid = getState().user._id
                dispatch(chatlist(res.data.result,userid))
            }
        })
    }
}