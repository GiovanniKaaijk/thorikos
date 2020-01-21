import React, { Component } from 'react'
import spots from '../images/spots.png'
import character from '../images/character.png'
import topcircle from '../images/top-circle.png'

export class About extends Component {
    render() {
        return (
            <section className="introduction about">
                <div className="flex">
                    <img className="circle" src={topcircle} alt="circle" />
                    <div>
                        <h2>What are we finding in Thorikos?</h2>
                        <p>The Thorikos Archaeological Research Project (TARP) stands in a long tradition of Belgian fieldwork, starting in 1960 with the excavations by Herman Mussche in the maritime fortifications on the Agios Nikolaos Peninsula. Since then, the site has been explored extensively by various Belgian teams, resulting in a good number of high-quality publications and a large amount of unpublished data that have in the meantime been digitized. These heritage data, and publication thereof, should be the basis of any fieldwork that will be planned on the site.</p>
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

export default About
