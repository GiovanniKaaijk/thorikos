import React, { Component } from 'react';
import './App.scss';

import Header from './components/Header'
import Data from './components/Data'
import NewTimeline from './components/newTimeline'

class App extends Component {
  state = {
    timePeriodCounts: [],
    data: [],
    x: 0,
    y: 0
  }

  setNewState = (value) => {
    this.setState({data: value})
  }
  _onMouseMove(e) {
    this.setState({ x: e.screenX, y: e.screenY });
  }
//<Timeline setNewState={this.setNewState}/>
  render() {
    return (
      <div className="App">
        
        <div className="container">
          <div className="svg" onMouseMove={this._onMouseMove.bind(this)}>
            <NewTimeline combinedData={this.state.data} positionX={this.state.x} positionY={this.state.y} />
          </div> 

          <Data setNewState={this.setNewState} />
        </div>
      </div>
    )
  }
}

export default App
