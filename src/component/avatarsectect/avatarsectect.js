import React, { Component } from 'react';
import { Grid,List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSectect extends Component {
    static propTypes = {
        handleSectect: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        this.state ={
            avatar: ''
        }
    }
    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                            .split(',')
                            .map(v=>({
                                icon: require(`./avatars/${v}.png`),
                                text: v
                            }))
        const selectTips = this.state.avatar.icon ? 
                            <div>
                                <span style={{verticalAlign:'bottom'}}>你选择的头像是：</span>
                                <img  style={{verticalAlign:'bottom',height:16}} src={this.state.avatar.icon} alt="avatar"/>
                            </div>
                            : <div><span>请选择一个头像</span></div>
        return (
            <div>
                <List renderHeader={selectTips}>
                    <Grid data={avatarList} columnNum={5} onClick={(item)=>{
                        this.setState({
                            avatar:item
                        })
                        this.props.handleSectect(item.text)
                    }} />
                </List>
            </div>
        );
    }
}

export default AvatarSectect;