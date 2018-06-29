import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { loadData } from '../../redux/user.redux'

@withRouter
@connect(
    state=>state.user,
    { loadData }
)

class AuthRouter extends Component {
    //获取用户信息
    componentDidMount(){
        const routerList = ['/login','/register']
        const pathName = this.props.location.pathname

        if(routerList.indexOf(pathName)>-1){
            return void 666
        }
        axios.get('/user/info').then(res=>{
            if(res.status === 200){
                if(res.data.code === 0){
                    const type = res.data.result.type
                    if(type === 'boss'&&pathName === '/genius'){
                        this.props.history.push('/boss')
                    }
                    this.props.loadData(res.data.result)
                }else {
                    this.props.history.push('/login')
                }
            }
        })
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default AuthRouter;