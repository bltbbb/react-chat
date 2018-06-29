import React, { Component } from 'react';
import { Result, Icon, WhiteSpace,List,Modal } from 'antd-mobile';
import { connect } from 'react-redux'
import { loginout } from '../../redux/user.redux'
import Cookies from 'js-cookie';

const {Item} = List
const {Brief} = Item
const {alert} = Modal


@connect(
    state=>state.user,
    {loginout}
)

class User extends Component {
    constructor(props){
        super(props)
    }
    loginout(){
        alert('退出登录', '确定退出吗', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Ok', onPress: () => {
                Cookies.remove('userid')
                this.props.loginout(()=>{this.props.history.push('/login')})
              } 
            },
          ])
    }
    render() {
        return  this.props.user ? (
            <div>
                <Result 
                   img={<img src={require(`../avatarsectect/avatars/${this.props.avatar}.png`)} style={{width:50}} alt="" />}
                   title={this.props.user}
                   message={this.props.type === 'boss' ? <div>{this.props.company}</div> : null}
                 />
                <List renderHeader={() => this.props.type === 'boss' ? '招聘' : '简介' }>
                    <Item>
                        {this.props.title}
                        <Brief>{this.props.desc}</Brief>
                        <Brief>{this.props.money}</Brief>
                    </Item>
                </List>
                <List>
                    <Item onClick={this.loginout.bind(this)}>注销</Item>
                </List>
            </div>
        ) : null;
    }
}

export default User;