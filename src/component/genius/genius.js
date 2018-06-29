import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatUser.redux'
import UserCard from '../userCard/userCard'

@connect(
    state=>state.chatUser,
    { getUserList }
)

class Genius extends Component {
    componentDidMount(){
        this.props.getUserList('genius')
    }
    render() {
        return <UserCard userList={this.props.userList}></UserCard>
    }
}

export default Genius;