import React, { Component } from 'react'
import * as d3 from 'd3';
export class TestTimeline extends Component {
    state = {
        timePeriods: ['Archaic', 'Classical', 'Late Antique', 'Late Antiquity', 'Geometric', 'Hellenistic'],
        timePeroidCounts: [],
        updateData: true,
        circles: {},
        selectedTimeFilter: []
    }
    
    componentDidMount(){
        let arr = [];
        this.state.timePeriods.forEach(period => {
            let newCount = {
                period: period,
                count: 0
            }
            arr.push(newCount)
        });
        this.setState({timePeroidCounts: arr})
    }
    componentDidUpdate(){
        this.countobjects()
    }

    countobjects = () => {
        if(this.props.combinedData.length > 0 && this.state.updateData) {
            let filter = this.state.selectedTimeFilter;
            if(this.state.selectedTimeFilter >= 0){
                filter = this.state.timePeriods
            }
            
            let counter = this.state.timePeroidCounts;
            this.props.combinedData.forEach(dataElement => {
                if(filter.includes(dataElement.Chronology1stImpression)){ 
                    counter.forEach(timeperiod => {
                        if(timeperiod.period === dataElement.Chronology1stImpression){ timeperiod.count += 1 } 
                    })
                }
            })
            this.setState({timePeroidCounts: counter, updateData: false})
            this.renderSVG(counter)
        }
    }

    changeTimefilter = (filter) => {
        if(!this.state.selectedTimeFilter.includes(filter)) {
            let newarr = [...this.state.selectedTimeFilter, filter]
            this.setState({selectedTimeFilter: newarr})
        } else {
            let newarr = [...this.state.selectedTimeFilter]
            let index = newarr.indexOf(filter)
            newarr.splice(index, 1)
            this.setState({selectedTimeFilter: newarr})
        }
    }

    deleteSVG = () => {
        let svg = document.querySelector('svg')
        svg.remove();
    }

    runFilter = () => {
        this.deleteSVG()
        let arr = [];
        this.state.timePeriods.forEach(period => {
            let newCount = {
                period: period,
                count: 0
            }
            arr.push(newCount)
        });
        this.setState({updateData: true, timePeroidCounts: arr}, this.countobjects())
    }

    turnAroundSVG = () => {
        this.updateSVG(this.state.timePeroidCounts.reverse())
    }

    updateSVG = counter => {
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 1400 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        x.domain(counter.map(function(d) { return d.period; }));
            let newdata = [];
            counter.forEach(dataElement => {
                let totalcolumns = counter.length
                let columnpadding = 20
                let dotwidth = 8
                let columnwidth = (width / totalcolumns) - columnpadding
                let xDots = Math.floor(columnwidth / dotwidth)

                let yCalc = 0;
                let xCalc = 0;
                let xCalcCoords = 0;
                for(let i=0;i<=dataElement.count - 1;i++) {
                    let thisY = yCalc
                    let thisXCoords = xCalcCoords
                    if(xCalc === xDots - 1) {
                        yCalc = yCalc += 8;
                        xCalc = 0;
                        xCalcCoords = 0;
                    } else {
                        xCalc = xCalc += 1
                        xCalcCoords = xCalcCoords += 8
                    }
                    let newElement = {
                        person: dataElement.period,
                        cx: function() { return x(dataElement.period) + thisXCoords + 2.5;},
                        cy: function() { return height - thisY - 5}
                    }
                    newdata.push(newElement)
                }
            });
            let circles = this.state.circles;
            let delayMax = 1000;
            circles
                .data(newdata)
                .transition()
                .duration(600)
                .delay(function(d){return Math.random()*delayMax;})
                .attr('cx', (d) => {return d.cx() })
                .attr('cy', (d) => { return d.cy() })
    }
    
    renderSVG = (counter) => {
            var margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = 1400 - margin.left - margin.right,
                height = 650 - margin.top - margin.bottom;
                
            var svg = d3.select(".svg").append('svg')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");

            var x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
            var y = d3.scaleLinear()
                    .range([height, 0]);

            let totalcolumns = counter.length
            let columnpadding = 20
            let dotwidth = 8
            let columnwidth = (width / totalcolumns) - columnpadding
            let xDots = Math.floor(columnwidth / dotwidth)
            //let highestNumber = d3.max(counter, function(d) { return d.count; });
            let maxDomain = Math.ceil((height/(2*(3+1.1))*xDots));
            x.domain(counter.map(function(d) { return d.period; }));

            y.domain([0, maxDomain]);
            let newdata = [];
            counter.forEach(dataElement => {

                let yCalc = 0;
                let xCalc = 0;
                let xCalcCoords = 0;
                for(let i=0;i<=dataElement.count -1;i++) {
                    let thisY = yCalc
                    let thisXCoords = xCalcCoords
                    if(xCalc === xDots - 1) {
                        yCalc = yCalc += 8;
                        xCalc = 0;
                        xCalcCoords = 0;
                    } else {
                        xCalc = xCalc += 1
                        xCalcCoords = xCalcCoords += 8
                    }
                    let newElement = {
                        person: dataElement.period,
                        cx: function() { return x(dataElement.period) + thisXCoords + 2.5;},
                        cy: function() { return height - thisY - 5}
                    }
                    newdata.push(newElement)
                }
            });
            let circles = svg.selectAll('circle')
                .data(newdata)
                .enter()
                .append('circle')
                .attr('r', 3)
                .attr('cx', (d) => { return d.cx() })
                .attr('cy', (d) => { return d.cy() })
            
            // add the x Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // add the y Axis
            svg.append("g")
                .call(d3.axisLeft(y));

            this.setState({circles: circles})

    }

    render() {
        return (
            <div>
                
                <button onClick={this.turnAroundSVG}>Reverse</button>
                {this.state.timePeriods.map(timePeriod => (
                    <div key={timePeriod} className="filter">
                        <label htmlFor={timePeriod}>{timePeriod}</label>
                        <input type="checkbox" id={timePeriod} onClick={this.changeTimefilter.bind(this, timePeriod)} />
                    </div>
                ))}
                <button onClick={this.runFilter}>Filter</button>
            </div>
        )
    }
}

export default TestTimeline
