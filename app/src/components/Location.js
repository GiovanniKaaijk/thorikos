import React, { Component } from 'react'

import location from '../images/where-and-why.png'

export class Location extends Component {
    render() {
        return (
            <section className="introduction location">
                    <div className="flex">
                        
                        <div>
                            <img className="location-img" src={location} alt="location" />
                        </div>
                        <div className="title">
                            <h2>The place</h2>
                            <h2>Where and why</h2>
                            <p>Thorikos occupies the east coast of the Lavrion area in Attica, Greece. The ancient town comprised a double-bay harbour at Agios Nikolaos.</p>
                            <p>In the early 5th century BC, a stone theatre was built as one of the first in the ancient world. But there was more to Thorikos than this: its bedrock consists of layered marble and mica-schist bearing lead ores rich in silver.</p>
                        </div>
                    </div>
            </section>
        )
    }
}

export default Location
