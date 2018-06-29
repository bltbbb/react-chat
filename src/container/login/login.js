import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

import Logo from '../../component/logo/logo'
import { login } from '../../redux/user.redux'

@connect(
    state=>state.user,
    { login }
)

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:'',
        }
    }
    onChange(key,data){
        this.setState({
            [key]:data
        })
    }
    register(){
        this.props.history.push('/register')
    }
    handleLogin(){
        this.props.login(this.state,()=>{this.props.history.push(this.props.redirect)})
    }
    render() {
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={(e)=>this.onChange('user',e)}
                        >用户</InputItem>
                        <InputItem
                            onChange={(e)=>this.onChange('pwd',e)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin.bind(this)}>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register.bind(this)}>注册</Button>
                    <WhiteSpace />
                </WingBlank>
            </div>
        );
    }
}

export default Login