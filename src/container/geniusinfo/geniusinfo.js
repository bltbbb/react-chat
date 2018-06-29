import React, { Component } from 'react';
import {InputItem,TextareaItem,NavBar,Button} from 'antd-mobile'
import AvatarSectect from '../../component/avatarsectect/avatarsectect'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'

@connect (
    state=>state.user,
    {update}
)

class GeniusInfo extends Component {
    constructor(props){
        super(props)
        this.state= {
            avatar: '',
            title: '',
            company: '',
            money: '',
            desc: '',
        }
    }
    onChange(k,v){
        this.setState({
            [k] : v
        })
    }
    postUserInfo(){
        this.props.update(this.state,()=>{this.props.history.push(this.props.redirect)})
    }
    render() {
        return (
            <div>
                <NavBar type='dark'>牛人完善信息页</NavBar>
                <AvatarSectect 
                    handleSectect={(v)=>{
                        this.onChange('avatar',v)
                    }}>
                </AvatarSectect>
                <InputItem onChange={v=>{this.onChange('title',v)}}>
                    应聘职位
                </InputItem>
                <TextareaItem 
                    onChange={v=>{this.onChange('desc',v)}}
                    autoHeight
                    rows={3}
                    title='个人简介'
                />
                <Button type='primary' onClick={
                    this.postUserInfo.bind(this)
                }>提交</Button>
            </div>
        );
    }
}

export default GeniusInfo;