import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch,Route } from 'react-router-dom'
import { getChatList,recvMsg } from '../../redux/chat.redux'

import NavLink from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import Msg from '../msg/msg'
import User from '../user/user'

@connect(
    state=>state,
    { getChatList,recvMsg }
)

class DashBoard extends Component {
    componentDidMount(){
        if(!this.props.chat.msgList.length){
            this.props.getChatList()
            this.props.recvMsg()
        }
    }
    render() {
        {console.log(this.props)}
        const type = this.props.user.type
        const pathName = this.props.location.pathname
        const navList = [
            {
                path:'/boss',
                title: '牛人列表',
                icon: 'boss',
                text: '牛人',
                component: Genius,
                hide: type === 'genius'
            },
            {
                path:'/genius',
                title: 'BOSS列表',
                icon: 'job',
                text: 'BOSS',
                component: Boss,
                hide: type === 'boss'
            },
            {
                path:'/msg',
                title: '聊天',
                icon: 'msg',
                component: Msg,
                text: '消息',
            },
            {
                path:'/me',
                title: '个人中心',
                icon: 'user',
                component: User,
                text: '我的',
            }
        ]
        return (
            <div>
                <NavBar mode="dark" className="fix-header">
                    {navList.find(v=>{return pathName === v.path}) ? navList.find(v=>{return pathName === v.path}).text : null}
                </NavBar>
                <div className="content">
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLink data={navList}></NavLink>
            </div>
        );
    }
}

export default DashBoard;