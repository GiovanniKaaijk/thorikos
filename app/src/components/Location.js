import React, { Component } from 'react'
import spots from '../images/spots.png'
import circle from '../images/circle.png'
import location from '../images/location.png'

export class Location extends Component {
    render() {
        return (
            <section className="introduction location">
                    <div className="flex">
                        <img className="circle" src={circle} alt="circle" />
                        <div>
                            <h2>Where is Thorikos located?</h2>
                            <p>The Thorikos Archaeological Research Project (TARP) stands in a long tradition of Belgian fieldwork, starting in 1960 with the excavations by Herman Mussche in the maritime fortifications on the Agios Nikolaos Peninsula. Since then, the site has been explored extensively by various Belgian teams, resulting in a good number of high-quality publications and a large amount of unpublished data that have in the meantime been digitized. These heritage data, and publication thereof, should be the basis of any fieldwork that will be planned on the site.</p>
                        </div>
                        <div>
                            <img className="spots" src={spots} alt="spots" />
                            <img className="location-img" src={location} alt="location" />
                        </div>
                    </div>
            </section>
        )
    }
}

export default Location
