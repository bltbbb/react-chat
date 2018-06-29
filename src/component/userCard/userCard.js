import React, { Component } from 'react';
import { Card,WhiteSpace,WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom'

const { Header,Body } = Card

@withRouter

class UserCard extends Component {
    goChat(v) {
        this.props.history.push('/chat/'+v._id)
    }
    render() {
        return (
            <WingBlank>
                {this.props.userList.map(v=>{
                    return (
                        <div key={v._id}>
                            <WhiteSpace></WhiteSpace>
                            <Card
                                onClick={this.goChat.bind(this,v)}
                            >
                                <Header
                                    title={v.user}
                                    thumb={require(`../avatarsectect/avatars/${v.avatar}.png`)}
                                    extra={v.title}
                                >
                                </Header>
                                <Body>
                                    {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                                    {v.desc.split('\n').map(d=>{return <p key={d}>{d}</p>})}
                                    {v.type === 'boss' ? <div>{v.money}</div> : null}
                                </Body>
                            </Card>
                        </div>
                    )
                })}
            </WingBlank>
        );
    }
}

export default UserCard;