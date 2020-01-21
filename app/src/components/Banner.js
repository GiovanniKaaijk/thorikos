import React, { Component } from 'react'
import logo from '../images/logo.svg'

export class Banner extends Component {
    render() {
        return (
            <div className="banner">
                <img className="banner-logo" src={logo} alt="logo" />
            </div>
        )
    }
}

export default Banner
