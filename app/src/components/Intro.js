import React, { Component } from 'react'
import seperator from '../images/seperator.svg'
import spots from '../images/spots.png'

import circle from '../images/circle.png'
import animation from '../images/Uitleg stip/Uitleg_stip_Gif.gif'
import startFrame from '../images/Uitleg stip/Begin_frame.png'
import endFrame from '../images/Uitleg stip/Man_stip.png'

export class Intro extends Component {
    state = {
        image: startFrame,
        init: true,
        click: true
    }

    animation = () => {
        setTimeout(() => {
            this.setState({image: endFrame, click: true})
            document.querySelector('.character').classList.remove('width')
        }, 3700)
    }
    componentDidMount() {
        document.querySelector('.intro-gif').addEventListener('mouseover', () => {
            if(this.state.init) {
                setTimeout(() => {
                    document.querySelector('.character').classList.add('width')
                    this.setState({image: animation, init: false}, this.animation())
                }, 1000);
            }
        })
        document.querySelector('.character').addEventListener('click', () => {
            if(this.state.click) {
                document.querySelector('.character').classList.add('width')
                this.setState({image: animation, init: false, click: false}, this.animation())
            }
        })
    }
    render() {
        return (
            <section className="introduction intro-gif">
                    <img className="seperator" src={seperator} alt="seperator" />
                    <div className="flex">
                        
                        <div className="title">
                            <h2>The guide</h2>
                            <h2>Hello,</h2>
                            <p>Hello I’m your guide for today. My name is Flores and I’m a fieldsearcher. Or archaeological fieldwork.</p>
                            <p>The Thorikos Archaeological Research Project (TARP) stands in a long tradition of Belgian fieldwork, starting in 1960 with the excavations by Herman Mussche in the maritime fortifications on the Agios Nikolaos Peninsula.</p>
                        </div>
                        <div>
                            <img className="spots" src={spots} alt="spots" />
                            <img className="character" src={this.state.image} alt="character" />
                        </div>
                    </div>
                </section>
        )
    }
}

export default Intro
