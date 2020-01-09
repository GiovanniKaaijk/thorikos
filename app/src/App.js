import React, { Component } from 'react';
import './App.scss';

import Header from './components/Header'
//import Timeline from './components/Timeline'
import Data from './components/Data'
import NewTimeline from './components/newTimeline'
class App extends Component {
  state = {
    timePeriodCounts: [],
    data: []
  }

  setNewState = (value) => {
    this.setState({data: value})
  }
//<Timeline setNewState={this.setNewState}/>
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="svg">
            <NewTimeline combinedData={this.state.data} />
          </div> 

          <Data setNewState={this.setNewState} />
        </div>
      </div>
    )
  }
}

export default App
