import React, { Component } from 'react';
import './App.scss';

import Data from './components/Data'
//import { cleanData } from './helpers/prepareData'

//import Header from './components/Header'
import Banner from './components/Banner'
import Intro from './components/Intro'
import Location from './components/Location'
import About from './components/About'
import Collection from './components/Collection'

import { gridData } from './helpers/GridPlot'
import NewTimeline from './components/newTimeline'

import ReactPageScroller from "react-page-scroller";

class App extends Component {
  state = {
    timePeriodCounts: [],
    data: [],
    x: 0,
    y: 0
  }

  componentDidMount() {
    // let data = cleanData();
    // console.log(data)
    let scrollPos = 0;
    
    // window.addEventListener('scroll', function(e) {
    //   console.log(window.pageYOffset)
    // })
  }

  goToPage = (pageNumber) => {
    this.reactPageScroller.goToPage(pageNumber);
  }

  setNewState = (value) => {
    this.setState({data: value})
  }
  _onMouseMove(e) {
    this.setState({ x: e.screenX, y: e.screenY });
  }
//<ReactPageScroller ref={(c) => {this.reactPageScroller = c}} animationTimer={1000} >
  render() {
    return (
      <div className="App">
        
        <div className="container">
        <ReactPageScroller ref={(c) => {this.reactPageScroller = c}} animationTimer={1000} >
        
          <Banner />
          
          <Location />
          <Collection />
          <div className="svg" onMouseMove={this._onMouseMove.bind(this)}>
            <NewTimeline gridData={gridData} combinedData={this.state.data} positionX={this.state.x} positionY={this.state.y} />
          </div> 
          </ReactPageScroller>
          <Data setNewState={this.setNewState} />
        </div>
      </div>
    )
  }
}

export default App
