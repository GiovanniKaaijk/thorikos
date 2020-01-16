import React, { Component } from 'react'
import * as d3 from 'd3';
export class TestTimeline extends Component {
    state = {
        timePeriods: ["archaic", "archaic/classical", "roman", "late bronze age", "final neolithic", "late archaic", "roman/late antique", "byzantine", "early bronze age", "early modern", "final neolithic/early bronze age", "classical/hellenistic", "modern", "geometric/archaic", "medieval/early modern", "medieval", "mycenaean", "late geometric", "archaic/hellenistic", "classical", "late antique", "late antiquity", "geometric", "bronze age", "late roman", "proto-geometric/geometric", "neolithic/early bronze age", "middle bronze age/late bronze age", "prehistoric", "late neolithic/final neolithic", "middle bronze age", "late classical/hellenistic", "late classical/roman", "late antique/medieval", "early bronze age ii", "middle geometric/late geometric", "roman/medieval", "classical/medieval", "classical/byzantine", "late antique/byzantine", "early geometric ii/middle geometric i", "early proto-geometric", "late proto-geometric/ geometric", "early bronze age/middle bronze age", "early iron age/archaic", "early iron age", "late geometric/early archaic", "late geometric ii", "late neolithic/early bronze age", "hellenistic/roman", "sub-geometric", "late classical", "late neolithic/bronze age", "proto-geometric/archaic", "geometric-classical", "neolithic/bronze age", "bronze age/archaic", "classical/late antique", "late antique-early modern", "archaic/late antique", "middle geometric", "bronze age/classical", "classical/late roman", "archaic/late roman", "prehistoric/archaic", "roman/early modern", "early geometric", "early christian", "late neolithic", "undetermined"],
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
        CollectingTimeFilter: []
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
          const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];
          
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
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
        this.countobjects()
        this.setupTime()
    }

    countobjects = () => {
        if(this.props.combinedData.length > 0 && this.state.updateData) {
            let filter = this.state.selectedTimeFilter;
            if(this.state.selectedTimeFilter >= 0){
                filter = this.state.timePeriods
            }
            
            let counter = this.state.timePeroidCounts;
            let newcountTracker = [];
            let newCounter = [];
            this.props.combinedData.forEach(dataElement => {
                if(filter.includes(dataElement.Chronology1stImpression)){ 
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
            newCounter.sort(this.dynamicSort('count', 'desc'))
            newCounter = newCounter.splice(0,11)
            if(this.state.firstInit === true) {
                this.setState({topTenCounts: newCounter})
            }
            
            if(this.state.firstInit) { 
                this.setupTime(true)
                this.renderSVG(newCounter) 
            }
            else { this.updateSVG(newCounter, 'period') }
            this.setState({timePeroidCounts: counter, updateData: false, firstInit: false, currentCount: newCounter})
        }
    }

    changePeriodfilter = (filter) => {
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

    changeTimefilter = (filter) => {
        if(!this.state.selectedTimeFilter.includes(filter)) {
            let newarr = [...this.state.selectedTimeFilter, filter]
            this.setState({CollectingTimeFilter: newarr})
        } else {
            let newarr = [...this.state.selectedTimeFilter]
            let index = newarr.indexOf(filter)
            newarr.splice(index, 1)
            this.setState({CollectingTimeFilter: newarr})
        }
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
        this.setState({updateData: true, timePeroidCounts: arr}, this.countobjects())
    }

    setupTime = (firstInit) => {
        let count = this.props.combinedData;
        let hours = [];
        let checkedHours = [];
        count.forEach(element => {
            if(element.time && element.time.length === 8){
                let time = element.time;
                time = time.substring(0,2)
                if(!checkedHours.includes(time)){
                    checkedHours.push(time)
                    hours.push({
                        period: time,
                        count: 0
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
        let hours = this.state.hours;
        
        this.updateSVG(hours, 'time')
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
        
        let delayMax = 5000;
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
            .transition()
            .duration(600)
            .delay(function(d){return Math.random()*delayMax/2;})
            .attr('cx', '0')
            .attr('cy', '0')
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
                console.log(d)
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

    render() {
        
        return (
            <div className="sidebar">
                <h1>Filter</h1>
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
