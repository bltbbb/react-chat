import React, { Component } from 'react';
import logoImg from './logo.png'
import './logo.css'

class Logo extends Component {
    render() {
        return (
            <div className="login-container">
                <img src={logoImg} alt="logo"/>
            </div>
        );
    }
}

export default Logo;