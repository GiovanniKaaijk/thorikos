import React, { Component } from 'react'
import logo from '../images/logo.svg'

export class Header extends Component {
    state = {
      imgToggle: false
    }
    componentDidMount() {
        window.onscroll = () => {
          let bannerImg = document.querySelector('.banner-logo');
          let logo = document.querySelector('header img')
          if(window.pageYOffset >= 80) {
            document.querySelector('header').classList.add('scrolled')
            bannerImg.classList.add('switch')
            setTimeout(() => {
              logo.classList.add('show')
              bannerImg.classList.add('hide')
              this.setState({imgToggle: true})
            }, 300);
          } else if(window.pageYOffset <= 70) {
            document.querySelector('header').classList.remove('scrolled')
            logo.classList.remove('show')
            bannerImg.classList.remove('hide')
            setTimeout(() => {
              bannerImg.classList.remove('switch')
            }, 100);
          } 
        };
      }
      
      componentWillUnmount() {
        window.onscroll = null;
      }
    render() {
        return (
            <header>
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
