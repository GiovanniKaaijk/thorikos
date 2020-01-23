import React, { Component } from 'react'
import map from '../images/map.mp4'
import ReactPlayer from 'react-player'
import Squares from '../images/squares.png'

export class Grid extends Component {
    state = {
        playing: false
    }
    componentDidMount() {
        document.querySelector('.video').addEventListener('mouseover', () => {
            this.setState({playing: true})
            setTimeout(() => {
                document.querySelector('.video .flex').classList.add('show')
            }, 10500);
        })
    }
    render() {
        return (
            <div className="video introduction">
                <ReactPlayer url={map} playing={this.state.playing} />
                <div className="flex">
                        <div>
                            <img className="squares" src={Squares} alt="squares" />
                        </div>
                        <div className="title">
                            <h2>The grid</h2>
                            <h2>How</h2>
                            <p>Between 2012 and 2015, a Ghent-Utrecht team conducted an intensive survey on the south slopes of the Velatouri, covering the area of the lower town of Thorikos as well as parts of the acropolis. </p>
                            <p>The survey was carried out by field- walking. First, the pre-existing 50×50 m macrosquares were divided in four. Four students then walked each resulting mesosquare for 20 minutes, which enabled the team to scan the entire surface for finds and features.</p>
                        </div>
                        
                    </div>
            </div>
        )
    }
}

export default Grid
