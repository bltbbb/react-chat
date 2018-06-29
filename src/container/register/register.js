import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import Logo from '../../component/logo/logo'

import { register } from '../../redux/user.redux'

const { RadioItem } = Radio;

@connect(
    state=>state.user,
    { register }
)

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:'',
            repwd:'',
            type: "genius"
        }
    }
    onChange(key,data){
        this.setState({
            [key]:data
        })
    }
    handleRegister(){
        this.props.register(this.state,()=>{this.props.history.push('/login')})
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
                            type="password"
                            onChange={(e)=>this.onChange('pwd',e)}
                        >密码</InputItem>
                        <InputItem
                            type="password"
                            onChange={(e)=>this.onChange('repwd',e)}
                        >重复密码</InputItem>
                        <RadioItem 
                            checked={this.state.type === 'genius'}
                            onChange={() => this.onChange('type','genius')}
                            >
                            牛人
                        </RadioItem>
                        <RadioItem checked={
                            this.state.type === 'boss'}
                            onChange={() => this.onChange('type','boss')}
                            >
                            BOSS
                        </RadioItem>
                    </List>
                    <WhiteSpace size="lg" />
                    <Button type="primary" onClick={this.handleRegister.bind(this)}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Register