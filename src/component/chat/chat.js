import React, { Component } from 'react';
import axios from 'axios'
import io from 'socket.io-client'
import { InputItem,List,NavBar,Icon,Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getChatList,sendMsg,recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'

const socket = io('ws://localhost:9500')

const emoji = '😀 😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 😇 😐 😑 😶 😏 😣 😥 😮 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😖 😞 😟 😤 😢 😭 😦 😧 😨 😬 😰 😱 😳 😵 😡 😠'
                .split(' ')
                .map(v=>({text:v}))

@connect(
    state=>state,
    { getChatList,sendMsg,recvMsg }
)

class Chat extends Component {
    constructor(props){
        super(props)
        this.state={
            text:'',
            msg:[],
            user:{},
            showEmoji: false
        }
    }
    componentDidMount(){
        if(!this.props.chat.msgList.length){
            this.props.getChatList()
            this.props.recvMsg()
        }
        this.getUserById()
        
    }
    componentDidUpdate(){
        setTimeout(() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'));
          }, 0)
    }
    emitMsg(){
        // socket.emit('sendMsg',{text:this.state.text})
        const from = this.props.user._id
        const to = this.props.match.params.id
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({
            text:''
        })
    }
    getUserById(){
        axios.get('/user/getUserById',{
            params:{
                userid:this.props.match.params.id
            }
        }).then((res)=>{
            this.setState({
                user:res.data.result
            })
        })
    }
    render() {
        const chatId = getChatId(this.props.match.params.id,this.props.user._id)
        const msgList = this.props.chat.msgList.filter(v=>v.chatid === chatId)
        if(!this.state.user.avatar){
            return null
        }
        return (
            <div id="chat-wrapper">
                <div className="chat-header">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"></Icon>}
                    onLeftClick={()=>{this.props.history.go(-1)}}
                    >{this.state.user.user}
                </NavBar>
                </div>
                <div className="chat-main">
                    {msgList.map(v=>{
                        const avataryou = require(`../avatarsectect/avatars/${this.state.user.avatar}.png`)
                        const avatarme = require(`../avatarsectect/avatars/${this.props.user.avatar}.png`)
                        const id = this.props.user._id
                        return (
                            id === v.from
                            ? <div className="chat-right" key={v._id}><span className="chat-bubble">{v.content}</span><img src={avatarme} alt="avatar"/></div>
                            : <div className="chat-left" key={v._id}><img src={avataryou} alt="avatar"/><span className="chat-bubble">{v.content}</span> </div>
                        )
                    }
                    )}
                </div>
                <div className="chat-footer">
                    <div className="sendMsg">
                        <List>
                            <InputItem
                                placeholder="commit"
                                onChange={(v) => { this.setState({text:v}) }}
                                extra={
                                    <div>
                                        <span onClick={()=>{this.setState({showEmoji:true})}} style={{marginRight:15}} >😀</span>
                                        <span onClick={this.emitMsg.bind(this)}>发送</span>
                                    </div>
                                }
                                value={this.state.text}
                            >
                                信息
                            </InputItem>
                        </List>
                        {
                            this.state.showEmoji 
                            ? <Grid
                                data={emoji}
                                columnNum={9}
                                carouselMaxRow={4}
                                isCarousel={true}
                            />
                            : null
                        }
                        
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Chat;