import React, { Component } from 'react'
import seperator from '../images/seperator.svg'
import spots from '../images/big-circle.png'

import character from '../images/character.png'

export class Animation extends Component {

    render() {
        return (
            <section className="introduction">
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
                            <img className="character" src={character} alt="character" />
                        </div>
                    </div>
                </section>
        )
    }
}

export default Animation
