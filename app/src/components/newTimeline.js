import React, { Component } from 'react'
import * as d3 from 'd3';
//import { countobjects } from '../helpers/counter';
import { mapcount } from '../helpers/mapcount';
export class TestTimeline extends Component {
    state = {
        timePeriods: ["archaic", "archaic/classical", "roman", "late bronze age", "final neolithic", "late archaic", "roman/late antique", "byzantine", "early bronze age", "early modern", "final neolithic/early bronze age", "classical/hellenistic", "modern", "geometric/archaic", "medieval/early modern", "medieval", "mycenaean", "late geometric", "archaic/hellenistic", "classical", "late antique", "late antiquity", "geometric", "bronze age", "late roman", "proto-geometric/geometric", "neolithic/early bronze age", "middle bronze age/late bronze age", "prehistoric", "late neolithic/final neolithic", "middle bronze age", "late classical/hellenistic", "late classical/roman", "late antique/medieval", "early bronze age ii", "middle geometric/late geometric", "roman/medieval", "classical/medieval", "classical/byzantine", "late antique/byzantine", "early geometric ii/middle geometric i", "early proto-geometric", "late proto-geometric/ geometric", "early bronze age/middle bronze age", "early iron age/archaic", "early iron age", "late geometric/early archaic", "late geometric ii", "late neolithic/early bronze age", "hellenistic/roman", "sub-geometric", "late classical", "late neolithic/bronze age", "proto-geometric/archaic", "geometric-classical", "neolithic/bronze age", "bronze age/archaic", "classical/late antique", "late antique-early modern", "archaic/late antique", "middle geometric", "bronze age/classical", "classical/late roman", "archaic/late roman", "prehistoric/archaic", "roman/early modern", "early geometric", "early christian", "late neolithic", "undetermined"],
        collectingHours: ['06', '07', '08', '09', '10', '11', '12', '13'],
        filterType: 'period',
        timePeroidCounts: [],
        topTenCounts: [],
        updateData: true,
        firstInit: true,
        circles: {},
        selectedTimeFilter: [],
        hours: [],
        dotRadius: 1.5,
        svgWidth: 1200,
        svgHeight: 750,
        x: 0,
        y: 0,
        currentCount: [],
        CollectingTimeFilter: [],
        periodToggle: false,
        timeToggle: false
    }

    /**
     * Function to sort an array of objects by some specific key.
     * 
     * @param {String} key Key of the object to sort.
     * @param {String} order order of the array (asc/desc)
     */
     dynamicSort = (key, order = 'asc') => {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
          }
          const letA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
          const letB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];
          
          let comparison = 0;
          if (letA > letB) {
            comparison = 1;
          } else if (letA < letB) {
            comparison = -1;
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
      }
    
    componentDidMount(){
        let arr = [];
        this.state.timePeriods.forEach(period => {
            let newCount = {
                period: period,
                count: 0,
                objects: []
            }
            arr.push(newCount)
        });
        
        this.setState({timePeroidCounts: arr})
    }
    componentDidUpdate(){
        this.countobjects(this.state.filterType)
    }

    countobjects = (filterType) => {
        // console.log(filterType, this.state.updateData)
        if(this.props.combinedData.length > 0 && this.state.updateData) {
            let filter;
            let counter = this.state.timePeroidCounts;
            let newcountTracker = [];
            let newCounter = [];
            let combinedData = this.props.combinedData;
            console.log(combinedData)
            if(filterType === 'period') {
                    filter = this.state.selectedTimeFilter;
                if(this.state.selectedTimeFilter.length <= 0){
                    filter = this.state.timePeriods
                }

                let timeFilter;
                if(this.state.timeToggle === true) {
                    timeFilter = this.state.CollectingTimeFilter;
                } else {
                    timeFilter = this.state.collectingHours
                }
                
                combinedData.forEach(dataElement => {
                    if(dataElement.time && dataElement.time.length === 8){
                        let time = dataElement.time;
                        dataElement.time = time.substring(0,2)
                    }
                    if(filter.includes(dataElement.Chronology1stImpression) && timeFilter.includes(dataElement.time)){ 
                        counter.forEach(timeperiod => {
                            if(timeperiod.period === dataElement.Chronology1stImpression){ 
                                if(!newcountTracker.includes(timeperiod.period)){
                                    newcountTracker.push(timeperiod.period)
                                    newCounter.push(timeperiod)
                                }
                                timeperiod.count += 1 
                                timeperiod.objects.push(dataElement)
                            } 
                        })
                    }
                })
            } else if (filterType === 'time') {
                filter = this.state.CollectingTimeFilter;
                if(this.state.CollectingTimeFilter.length <= 0){
                    filter = this.state.collectingHours
                }
                let periodFilter;
                if(this.state.periodToggle === true) {
                    periodFilter = this.state.selectedTimeFilter;
                } else {
                    periodFilter = this.state.timePeriods
                }

                counter = this.state.currentCount
                combinedData.forEach(dataElement => {
                    if(dataElement.time && dataElement.time.length === 8){
                        let time = dataElement.time;
                        dataElement.time = time.substring(0,2)
                    }
                    if(filter.includes(dataElement.time) && periodFilter.includes(dataElement.Chronology1stImpression)){ 
                        counter.forEach(timeperiod => {
                            if(timeperiod.period === dataElement.time){ 
                                if(!newcountTracker.includes(timeperiod.period)){
                                    newcountTracker.push(timeperiod.period)
                                    newCounter.push(timeperiod)
                                }
                                timeperiod.count += 1 
                                timeperiod.objects.push(dataElement)
                            } 
                        })
                    }
                })
            }

            newCounter.sort(this.dynamicSort('count', 'desc'))
            newCounter = newCounter.splice(0,11)
            if(this.state.firstInit === true) {
                this.setState({topTenCounts: newCounter})
            }
            
            if(this.state.firstInit) { 
                this.setupTime(true)
                this.renderSVG(newCounter) 
            }
            else { this.updateSVG(newCounter, filterType) }
            this.setState({timePeroidCounts: counter, updateData: false, firstInit: false, currentCount: newCounter})
        }
    }

    changePeriodfilter = (filter) => {
        let newarr = []
        if(!this.state.selectedTimeFilter.includes(filter)) {
             newarr = [...this.state.selectedTimeFilter, filter]
        } else {
             newarr = [...this.state.selectedTimeFilter]
            let index = newarr.indexOf(filter)
            newarr.splice(index, 1)
        }
        this.setState({selectedTimeFilter: newarr}, () => {
            let toggle = Boolean;
            if(this.state.selectedTimeFilter.length > 0) {
                toggle = true
            } else {
                toggle = false
            }
            this.setState({periodToggle: toggle})
        })
    }

    changeTimefilter = (filter) => {
        let newarr = [];
        if(!this.state.CollectingTimeFilter.includes(filter)) {
             newarr = [...this.state.CollectingTimeFilter, filter]
        } else {
             newarr = [...this.state.CollectingTimeFilter]
            let index = newarr.indexOf(filter)
            newarr.splice(index, 1)
        }
        this.setState({CollectingTimeFilter: newarr}, () => {
            let toggle = Boolean;
            if(this.state.CollectingTimeFilter.length > 0) {
                toggle = true
            } else {
                toggle = false
            }
            this.setState({timeToggle: toggle})
        })
    }

    deleteSVG = () => {
        let svg = document.querySelector('svg')
        svg.remove();
    }

    runFilter = () => {
        //this.deleteSVG()
        let arr = [];
        this.state.timePeriods.forEach(period => {
            let newCount = {
                period: period,
                count: 0,
                objects: []
            }
            arr.push(newCount)
        });
        this.setState({updateData: true, timePeroidCounts: arr, filterType: 'period'}, this.countobjects('period'))
    }

    setupTime = (firstInit) => {
        let count = this.props.combinedData;
        let hours = [];
        let checkedHours = [];
        count.forEach(element => {
            if(element.time){
                let time = element.time;
                if(!checkedHours.includes(time)){
                    checkedHours.push(time)
                    hours.push({
                        period: time,
                        count: 0,
                        objects: []
                    })
                }
                let index = hours.findIndex(h => h.period === time)
                hours[index].count += 1
            } 
        })
        if(firstInit) {
            hours.sort(this.dynamicSort('period', 'asc'))
            this.setState({hours: hours, timeInit: false})
        }
    }

    filterTime = () => {
        let arr = [];
        this.state.hours.forEach(time => {
            let newCount = {
                period: time.period,
                count: 0,
                objects: []
            }
            arr.push(newCount)
        });
        this.setState({updateData: true, currentCount: arr, filterType: 'time'}, this.countobjects('time'))
    }

    updateSVG = (counter, periods) => {
        let margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = this.state.svgWidth - margin.left - margin.right,
        height = this.state.svgHeight - margin.top - margin.bottom - 5;
        let padding = counter.length / 100 * 1.2;
        counter.sort(this.dynamicSort('period'))
        let x = d3.scaleBand()
            .range([0, width])
            .padding(padding);
        let y = d3.scaleLinear()
                .range([height, 0]);
        let newdata = [];
        let totalcolumns = counter.length
        let columnpadding = 20
        let dotwidth = 6
        let columnwidth = (width / totalcolumns) - columnpadding
        let xDots = Math.floor(columnwidth / dotwidth)
        let rows = Math.ceil(height/6)
            
        let domain = Math.ceil(rows * xDots)
        //let maxDomain = Math.ceil((height/(2*(3+1.1))*xDots));
        //let maxValue = d3.max(counter, function(d) { return +d.count;} );
        
        x.domain(counter.map(function(d) { return d.period; }));
        y.domain([0, domain]);
        counter.forEach(dataElement => {
            let yCalc = 0;
            let xCalc = 0;
            let xCalcCoords = 0;
            let stepSize = this.state.dotRadius * 4;
            for(let i=0;i<dataElement.count - 1;i++) {
                let thisY = yCalc
                let thisXCoords = xCalcCoords
                if(xCalc === xDots - 1) {
                    yCalc = yCalc += stepSize;
                    xCalc = 0;
                    xCalcCoords = 0;
                } else {
                    xCalc = xCalc += 1
                    xCalcCoords = xCalcCoords += stepSize
                }
                let newElement = {}
                if(periods === 'period') {
                    newElement = {
                        element: dataElement.objects[i],
                        timeperiod: dataElement.period,
                        cx: function() { return x(dataElement.period) + thisXCoords + 2.5;},
                        cy: function() { return height - thisY - 5}
                    }
                } else if(periods === 'time') {
                    newElement = {
                        timeperiod: dataElement.period,
                        cx: function() { return x(dataElement.period) + thisXCoords + 2.5;},
                        cy: function() { return height - thisY - 5}
                    }
                }
                newdata.push(newElement)
            }
        });
        let circles = this.state.circles;
        
        let delayMax = 1000;
        circles
            .selectAll('circle')
            .data(newdata)
            .transition()
            .duration(600)
            .delay(function(d){return Math.random()*delayMax;})
            .attr('cx', (d) => {return d.cx() })
            .attr('cy', (d) => { return d.cy() })
        circles
            .selectAll('circle')
            .data(newdata)
            .exit()
            // .transition()
            // .duration(600)
            // .delay(function(d){return Math.random()*delayMax/2;})
            // .attr('cx', '0')
            // .attr('cy', '0')
            // .style('opacity', 0)
            .remove()

        circles
            .selectAll('circle')
            .data(newdata)
            .enter()
            .append('circle')
            .attr('r', this.state.dotRadius)
            .transition()
            .duration(600)
            .delay(function(d){return Math.random()*delayMax;})
            .attr('cx', (d) => {return d.cx() })
            .attr('cy', (d) => { return d.cy() });
        circles.select('.axis-x')
            .call(d3.axisBottom(x)).attr('transform', 'translate(0,' + height + ')')
        this.bindXValues()

        circles.select('.axis-y')   
            .call(d3.axisLeft(y).ticks(10))  
        this.setState({})
    }
    
    renderSVG = (counter) => {
            let margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = this.state.svgWidth - margin.left - margin.right,
                height = this.state.svgHeight - margin.top - margin.bottom;
                
            let svg = d3.select(".svg").append('svg')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");

            d3.select('.svg').append('div').attr('class', 'tooltip').style('visibility', 'hidden').style("opacity", '0').append('p')
            counter.sort(this.dynamicSort('period'))
            let x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
            let y = d3.scaleLinear()
                    .range([height, 0]);
            
            let totalcolumns = counter.length
            let columnpadding = 20
            let dotwidth = 6
            let columnwidth = (width / totalcolumns) - columnpadding
            let xDots = Math.floor(columnwidth / dotwidth)
            let rows = Math.ceil(height/6)
            
            let domain = Math.ceil(rows * xDots)
            x.domain(counter.map(function(d) { return d.period; }));

            y.domain([0, domain]);
            let newdata = [];
            counter.forEach(dataElement => {

                let yCalc = 0;
                let xCalc = 0;
                let xCalcCoords = 0;
                let stepSize = this.state.dotRadius * 4;
                for(let i=0;i<= dataElement.count -1;i++) {
                    let thisY = yCalc
                    let thisXCoords = xCalcCoords
                    if(xCalc === xDots - 1) {
                        yCalc = yCalc += stepSize; 
                        xCalc = 0;
                        xCalcCoords = 0;
                    } else {
                        xCalc = xCalc += 1
                        xCalcCoords = xCalcCoords += stepSize
                    }
                    let newElement = {
                        element: dataElement.objects[i],
                        timeperiod: dataElement.period,
                        cx: function() { return x(dataElement.period) + thisXCoords + 2.5;},
                        cy: function() { return height - thisY - 5}
                    }
                    newdata.push(newElement)
                }
            });
            svg
                .selectAll('circle')
                .data(newdata, function(d) { return d.Event })
                .enter()
                .append('circle')
                .attr('r', this.state.dotRadius)
                .attr('cx', (d) => { return d.cx() })
                .attr('cy', (d) => { return d.cy() })
                .style('fill', '#303438')
                .on('mouseover', function(d) {
                    
                })
            
            // add the x Axis
            svg.append("g")
                .attr('class', 'axis-x')
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // add the y Axis
            svg.append("g")
                .attr('class', 'axis-y')
                .call(d3.axisLeft(y));
            this.bindXValues()
            this.setState({circles: svg})
    }

    bindXValues = () => {
        d3.selectAll('.axis-x .tick')
            .style("pointer-events", "visiblePainted")
            .on("mousemove", (d) => {
                let thisCount;
                this.state.currentCount.forEach(count => {
                    if(count.period === d) {
                        thisCount = count.count 
                    }
                })
                d3.select('.tooltip')
                    .style("top", (this.props.positionY - 175)+"px")
                    .style("left",(this.props.positionX - 15)+"px")
                    .style('visibility', 'visible')
                    .style("opacity", '1')
                let tooltip = document.querySelector('.tooltip p')
                tooltip.textContent = thisCount
            })
            .on("mouseout", (d) => {
                d3.select('.tooltip')
                    .transition()
                    .duration(100)
                    .style("opacity", '0')
                    .style('visibility', 'hidden')
            })
    }

    createMap = () => {
        let svg = this.state.circles;
        let margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = this.state.svgWidth - margin.left - margin.right;
        let griddata = this.props.gridData(),
                step = width / 20,
                xStepInterval = 0,
                yStepInterval = 0
            
            griddata.forEach(gridElement => {
                gridElement.x = step * xStepInterval
                gridElement.y = step * yStepInterval
                if(xStepInterval === 19) {
                    xStepInterval = 0;
                    yStepInterval += 1;
                } else {
                    xStepInterval += 1;
                }
            })
            
            svg 
                .selectAll('rect')
                .data(griddata)
                .enter()
                .append('rect')
                .attr("x", (d) => {return d.x })                         
                .attr("y", (d) => {return d.y })
                .attr("width", step)
                .attr("height", step)
                .style('fill', 'transparent')
                .style('stroke', (d) => { return d.context === null ? null : 'black' })
            svg
                .selectAll('.axis-x')                
                .remove()
            svg
                .selectAll('.axis-y')
                .remove()

            let newarr = []
            let counter = mapcount(this.props.combinedData, griddata);
            let periodFilter = this.state.selectedTimeFilter;
            if(this.state.selectedTimeFilter.length <= 0){
                periodFilter = this.state.timePeriods
            }
            let timeFilter;
            if(this.state.timeToggle === true) {
                timeFilter = this.state.CollectingTimeFilter;
            } else {
                timeFilter = this.state.collectingHours
            }
            
            counter.forEach(count => {
                if(count.objects.length > 0) {
                    count.objects.forEach(object => {
                        if(periodFilter.includes(object.Chronology1stImpression) && timeFilter.includes(object.time)) {
                            object.x = count.x + (Math.random() * step)
                            object.y = count.y + (Math.random() * step)
                            newarr.push(object)
                        }
                    })
                }
            })
            console.log(newarr)
            let delayMax = 1000;
            svg
                .selectAll('circle')
                .data(newarr)
                .transition()
                .duration(600)
                .delay(function(d){return Math.random()*delayMax;})
                .attr('cx', (d) => { return d.x })
                .attr('cy', (d) => { return d.y })
            svg
                .selectAll('circle')
                .data(newarr)
                .exit()
                // .transition()
                // .duration(600)
                // .delay(function(d){return Math.random()*delayMax/2;})
                // .attr('cx', '0')
                // .attr('cy', '0')
                // .style('opacity', 0)
                .remove()

            svg
                .selectAll('circle')
                .data(newarr)
                .enter()
                .append('circle')
                .attr('r', this.state.dotRadius)
                .transition()
                .duration(600)
                .delay(function(d){return Math.random()*delayMax;})
                .attr('cx', (d) => {return d.x })
                .attr('cy', (d) => { return d.y });
    }

    render() {
        
        return (
            <div className="sidebar">
                <h1>Filter</h1>
                <button onClick={this.createMap}>map</button>
                <div className="timeperiods">
                    {this.state.topTenCounts.map(timePeriod => (
                        <div key={timePeriod.period} className="filter">
                            <label htmlFor={timePeriod.period}>{timePeriod.period}<sup> {timePeriod.count}</sup></label>
                            <input type="checkbox" id={timePeriod.period} onClick={this.changePeriodfilter.bind(this, timePeriod.period)} />
                        </div>
                    ))}
                </div>
                <button className="filterBtn" onClick={this.runFilter}>Filter</button>
                <div className="timeperiods">
                    {this.state.hours.map(hour => (
                        <div key={hour.period} className="filter">
                            <label htmlFor={hour.period}>{hour.period}<sup> {hour.count}</sup></label>
                            <input type="checkbox" id={hour.period} onClick={this.changeTimefilter.bind(this, hour.period)} />
                        </div>
                    ))}
                </div>
                <button className="filterBtn" onClick={this.filterTime}>timefilter</button>
            </div>
        )
    }
}

export default TestTimeline
