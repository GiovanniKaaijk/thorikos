import React, { Component } from 'react'
import * as d3 from 'd3';
import allSurveyEntries from '../data/surveydata.csv'
import allFieldsheets from '../data/AllFieldsheets.csv'

export class Data extends Component {
    state = {
        surveyData: [],
        fieldsheetData: [],
        combineddata: []
    }
    newState = (arr) => {
        this.props.setNewState(arr)
    }
    componentDidMount() {
        let cleanData = async () => {
            await d3.csv(allSurveyEntries).then((data, err) => {
                if(err) { console.log(err) } 
                data.forEach(dataElement => {
                    if(dataElement.Context){
                        dataElement.Chronology1stImpression = dataElement.Chronology1stImpression.toLowerCase();
                        if(dataElement.Context.length === 7) {
                            dataElement.Context = [parseInt(dataElement.Context.slice(4,7)), 0]
                        } else if (dataElement.Context.length === 9) {
                            dataElement.Context = [parseInt(dataElement.Context.slice(4,7)), parseInt(dataElement.Context.slice(8,9))]
                        } else if (dataElement.Context.length === 11) {
                            let context = dataElement.Context.slice(10,11);
                            if (context === 'A') { context = 1 }
                            if (context === 'B') { context = 2 }
                            if (context === 'C') { context = 3 }
                            if (context === 'D') { context = 4 }
                            dataElement.Context = [parseInt(dataElement.Context.slice(4,7)), parseInt(context)]
                        } else {
                            dataElement.Context = [parseInt(dataElement.Context.slice(4,7)), 0]
                        }
                        let dateContext = dataElement.ExcavationDate + '-' +dataElement.Context
                        dataElement.dateContext = dateContext
                }
                });
                this.setState({surveyData: data})
            })
            await d3.csv(allFieldsheets).then((data, err) => {
                if(err) { console.log(err) } 
                data.forEach(dataElement => {
                    if(dataElement.Mesosquare.length === 3) {
                        dataElement.Context = [dataElement.Context, dataElement.Mesosquare.slice(2,3)]
                    } else if(dataElement.Mesosquare.length === 4) {
                        dataElement.Context = [dataElement.Context, dataElement.Mesosquare.slice(3,4)]
                    } else if(dataElement.Mesosquare.length === 5) {
                        dataElement.Context = [dataElement.Context, dataElement.Mesosquare.slice(4,5)]
                    } else if(dataElement.Mesosquare.length === 6) {
                        dataElement.Context = [dataElement.Context, dataElement.Mesosquare.slice(5,6)]
                    }
                    dataElement.Context = [parseInt(dataElement.Context[0]), parseInt(dataElement.Context[1])]
                    let date = dataElement.Date.split('-')
                    date[2] = date[2].slice(2,4)
                    date = date.join('-')
                    let dateContext = date + '-' + dataElement.Context
                    dataElement.dateContext = dateContext
                });
                this.setState({fieldsheetData: data})
                transFormData()
            })
        }
        let newarr = []
        let objectarr = []
        let transFormData = () => {
            this.state.surveyData.forEach(surveyData => {
                this.state.fieldsheetData.forEach(fieldsheetElement => {
                    if(surveyData.dateContext === fieldsheetElement.dateContext) {
                        let newObject = surveyData
                        newObject.time = fieldsheetElement.Time;
                        newObject.visibility = fieldsheetElement.Visibility;
                        newObject.slopeGradient = fieldsheetElement.SlopeGradient;
                        newObject.aspect = fieldsheetElement.Aspect;
                        newObject.surfaceCondition = fieldsheetElement.SurfaceCondition;
                        newObject.soilTypes = fieldsheetElement.SoilTypes;
                        newObject.topography = fieldsheetElement.Topography;
                        newarr.push(newObject)
                        if(!objectarr.includes(newObject.ShapeObject)){
                            objectarr.push(newObject.ShapeObject)
                        }
                    }
                })
            })
            this.setState({combineddata: newarr})
            this.newState(newarr)
            console.log(objectarr)
        }

        cleanData()
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Data
