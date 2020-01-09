import React, { Component } from 'react'
import logo from '../images/thorikos-logo.png'

export class Header extends Component {
    state = {

    }
    render() {
        return (
            <header className="App-header">
                <img src={logo} alt="logo"/>
                <div className="menu-items">
                    <ul>
                        <li>About us</li>
                        <li>Blog</li>
                        <li>Timeline</li>
                    </ul>
                </div>
            </header>
        )
    }
}

export default Header
