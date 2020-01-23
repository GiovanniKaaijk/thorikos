import React, { Component } from 'react'
import spots from '../images/big-circle.png'

import animation from '../images/Uitleg stip/Uitleg_stip_Gif.gif'
import startFrame from '../images/Uitleg stip/Begin_frame.png'
import endFrame from '../images/Uitleg stip/Man_stip.png'

export class Animation extends Component {
    state = {
        image: startFrame,
        init: true,
        click: true
    }

    animation = () => {
        setTimeout(() => {
            this.setState({image: endFrame, click: true})
        }, 4500)
    }
    componentDidMount() {
        document.querySelector('.intro-gif').addEventListener('mouseover', () => {
            if(this.state.init) {
                setTimeout(() => {
                    this.setState({image: animation, init: false}, this.animation())
                }, 1000);
            }
        })
        document.querySelector('.animationCharacter').addEventListener('click', () => {
            if(this.state.click) {
                this.setState({image: animation, init: false, click: false}, this.animation())
            }
        })
    }
    render() {
        return (
            <section className="introduction intro-gif">
                    
                    <div className="flex">
                        
                        <div className="title">
                            <h2>About</h2>
                            <h2>The dots,</h2>
                            <p>All our student found shards in the field. These shards used to be part of a vase or an other object. The objects date back to 8000 before christ and 600 after christ. We simplified the shard to dots. So it’s easier to understand</p>
                            
                        </div>
                        <div>
                            <img className="spots" src={spots} alt="spots" />
                            <img className="character animationCharacter" src={this.state.image} alt="character" />
                        </div>
                    </div>
                </section>
        )
    }
}

export default Animation
