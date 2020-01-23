import React, { Component } from 'react'
import logo from '../images/logo.svg'
import scrollDown from '../images/scroll-down.svg'

export class Banner extends Component {
    render() {
        return (
            <div className="banner">
                <img className="banner-logo" src={logo} alt="logo" />
                <img className="scrolldown" alt="scrolldown arrow" src={scrollDown} />
            </div>
        )
    }
}

export default Banner
