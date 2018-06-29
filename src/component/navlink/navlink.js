import React, { Component } from 'react';
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const { Item } = TabBar

@withRouter

@connect(
    state=>state.chat
)

class NavLink extends Component {
    render() {
        const pathName = this.props.location.pathname
        const navList = this.props.data.filter(v=>!v.hide)
        return (
            <div>
                <TabBar>
                    {navList.map(v=>{
                        return(
                            <Item
                                title = {v.title}
                                key= {v.title}
                                badge={v.path === '/msg' ? this.props.unRead : 0}
                                icon= {{ uri: require(`./img/${v.icon}.png`) }}
                                selectedIcon= {{ uri: require(`./img/${v.icon}-active.png`) }}
                                selected={pathName === v.path}
                                onPress={() => {this.props.history.push(v.path)}}
                            >
                            </Item>
                        )
                    })}
                </TabBar>
            </div>
        );
    }
}

export default NavLink;