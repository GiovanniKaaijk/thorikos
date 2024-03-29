import React, { Component } from 'react';
import './App.scss';

import Data from './components/Data'
//import { cleanData } from './helpers/prepareData'

//import Header from './components/Header'
import Banner from './components/Banner'
import Animation from './components/Animation'
import Location from './components/Location'
import Grid from './components/Grid'
import Intro from './components/Intro'
import Collection from './components/Collection'

import { gridData } from './helpers/GridPlot'
import NewTimeline from './components/newTimeline'

import ReactPageScroller from "react-page-scroller";

class App extends Component {
  state = {
    timePeriodCounts: [],
    data: [],
    x: 0,
    y: 0,
    vh: 0,
    blockScroll: false
  }

  componentDidMount() {
    let vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    vh = vh * 4;
    this.setState({vh: vh})
  }

  changeScroll = () => {
    this.setState({blockScroll: true})
  }
  
  goToPage = (pageNumber) => {
    this.reactPageScroller.goToPage(pageNumber);
  }

  setNewState = (value) => {
    this.setState({data: value})
  }
  _onMouseMove(e) {
    this.setState({ x: e.screenX, y: e.screenY});
  }
//<ReactPageScroller ref={(c) => {this.reactPageScroller = c}} animationTimer={1000} >
  render() {
    return (
      <div className="App">
        
        <div className="container">
        <ReactPageScroller ref={(c) => {this.reactPageScroller = c}} animationTimer={1000} blockScrollUp={this.state.blockScroll} >

          <Banner />
          <Intro />
          <Animation />
          <Location />
          <Grid />
          <Collection />
          <div className="svg" onMouseMove={this._onMouseMove.bind(this)}>
            <div className="infobox">
              <div className="production">
                <h3>Production place:</h3>
                <p></p>
              </div>
              <div className="shape">
                <h3>Shape:</h3>
                <p></p>
              </div>
              <div className="conservation">
                <h3>Object conservation:</h3>
                <p></p>
              </div>
            </div>
            <NewTimeline changeScroll={this.changeScroll} gridData={gridData} combinedData={this.state.data} positionX={this.state.x} positionY={this.state.y} />
          </div> 
          </ReactPageScroller>
          <Data setNewState={this.setNewState} />
        </div>
      </div>
    )
  }
}

export default App
