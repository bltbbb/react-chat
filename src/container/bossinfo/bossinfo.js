import React, { Component } from 'react';
import {InputItem,TextareaItem,NavBar,Button} from 'antd-mobile'
import AvatarSectect from '../../component/avatarsectect/avatarsectect'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'

@connect (
    state=>state.user,
    {update}
)

class BossInfo extends Component {
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
                <NavBar type='dark'>BOSS完善信息页</NavBar>
                <AvatarSectect 
                    handleSectect={(v)=>{
                        this.onChange('avatar',v)
                    }}>
                </AvatarSectect>
                <InputItem onChange={v=>{this.onChange('title',v)}}>
                    招聘职位
                </InputItem>
                <InputItem onChange={v=>{this.onChange('company',v)}}>
                    公司名称
                </InputItem>
                <InputItem onChange={v=>{this.onChange('money',v)}}>
                    职位薪资
                </InputItem>
                <TextareaItem 
                    onChange={v=>{this.onChange('desc',v)}}
                    autoHeight
                    rows={3}
                    title='职位要求'
                />
                <Button type='primary' onClick={
                    this.postUserInfo.bind(this)
                }>提交</Button>
            </div>
        );
    }
}

export default BossInfo;