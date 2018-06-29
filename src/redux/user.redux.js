import axios from 'axios'

import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const AUTH_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_OUT = 'LOGIN_OUT'

const initState = {
    user:'',
    pwd:'',
    type:'',
    msg:''
}

//reducer
export function user(state=initState, action){
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state,msg:'',...action.data}
        case AUTH_SUCCESS:
            return {...state,redirect:getRedirectPath(action.data),msg:'',...action.data}
        case LOGIN_OUT:
            return {...initState,redirect:'/login'}
        case LOAD_DATA:
            return {...state,...action.playload}
        case ERROR_MSG:
            return {...state,registerSuccess:false,msg:action.msg}
        default:
            return state
    }
}

function registersuccessHandle(data){
    return {type:REGISTER_SUCCESS,data:data}
}

function authHandle(obj){
    const {pwd,...data} = obj
    return {type:AUTH_SUCCESS,data:data}
}

function errorHandle(msg){
    return {type:ERROR_MSG,msg:msg}
}

export function loadData(data){
    return {type:LOAD_DATA,playload:data}
}

export function loginout(fn){
    if(fn){
        fn()
    }
    return {type:LOGIN_OUT}
}

export function register({user,pwd,repwd,type},fn){
    if(!user||!pwd||!repwd||!type){
        return errorHandle('请填写完整')
    }
    if(pwd !== repwd){
        return errorHandle('密码不一致')
    }
    return dispatch => {
        axios.post('/user/register',{user,pwd,type})
        .then(res=>{
            if(res.status === 200 && res.data.code === 0){
                if(fn){
                    fn()
                }
                dispatch(registersuccessHandle({user,pwd,type}))
            }else {
                dispatch(errorHandle(res.data.msg))
            }
        })
    }
}

export function login({user,pwd},fn){
    if(!user||!pwd){
        return errorHandle('请填写完整')
    }
    return dispatch => {
        axios.post('/user/login',{user,pwd})
        .then(res=>{
            if(res.status === 200 && res.data.code === 0){
                const data = res.data.result
                dispatch(authHandle(data))
                if(fn){
                    fn()
                }
            }else {
                dispatch(errorHandle(res.data.msg))
            }
        })
    }
}

export function update(data,fn){
    return dispatch => {
        axios.post('/user/update',data)
        .then(res=>{
            if(res.status === 200 && res.data.code === 0){
                const data = res.data.result
                dispatch(authHandle({...data}))
                if(fn){
                    fn()
                }
            }else {
                dispatch(errorHandle(res.data.msg))
            }
        })
    }
}