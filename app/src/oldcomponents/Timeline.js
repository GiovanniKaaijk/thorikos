import * as d3 from 'd3';

import React, { Component } from 'react'
import csvData from './data.csv';

//"d3": "^3.5.17"
export class Timeline extends Component {
    state = {
        timePeriods: ['Archaic', 'Classical', 'Late Antique', 'Late Antiquity', 'Geometric', 'Hellenistic'],
        timePeroidCounts: []
    }

    newState = (arr) => {
        console.log(arr)
        this.props.setNewState(arr)
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
        this.newState(arr)

        let dim = {width: 1400, height: 600};
        let margin = {top: 10, bottom: 50, left: 50, right: 10};
        let inputHeight = 20;
        dim.graphWidth = dim.width - margin.left - margin.right;
        dim.graphHeight = dim.height - margin.top - margin.bottom;
        d3.select('body').on('keydown',function()
        {
        if (d3.event.which === 39)
        {
            next();
        }
        if (d3.event.which === 37)
        {
            prev();
        }
        });
        let svg = d3.select('svg')
        .attr({width: dim.width, height: dim.height})
        .style({margin:0,padding:0});
        let axisLayer = svg.append('g').attr('transform','translate(' + margin.left + ',' + margin.top + ')');
        let graphLayer = svg.append('g').attr('transform','translate(' + margin.left + ',' + margin.top + ')');
        let inputLayer = svg.append('g').attr('transform','translate(0,' + (dim.height - inputHeight) + ')');

        let xScale = d3.scale.ordinal().rangeBands([0,dim.graphWidth],0.01);
        let xLocalScale = d3.scale.ordinal();
        let yScale = d3.scale.ordinal().rangePoints([dim.graphHeight, 0]);
        let colorScale = d3.scale.category10();
        let inputScale = d3.scale.ordinal().rangeBands([0,dim.width-margin.right]);

        let xAxis = d3.svg.axis().orient('bottom').scale(xScale);
        let yAxis = d3.svg.axis().orient('left').scale(yScale);

        let xAxisObj = axisLayer.append('g')
        .attr('transform','translate('+0+','+dim.graphHeight+')')
        .attr('class','axis')
        .call(xAxis);
        let yAxisObj = axisLayer.append('g')
        .attr('transform','translate('+0 +','+0+')')
        .attr('class','axis')
        .call(yAxis);

        axisLayer.selectAll('.axis text').style('font','14px "Lucida Grande", Helvetica, Arial, sans-serif');
        axisLayer.selectAll('.axis path.domain').style({fill:'none',stroke:'#000000','shape-rendering':'crispEdges'});
        axisLayer.selectAll('.axis line').style({fill:'none',stroke:'#000000','shape-rendering':'crispEdges'});

        let time = 0;
        let yearLabel = 'year';
        let radius = 3;
        let mar = 0.6;
        let barWidth = 16;
        let years = [];

        let duration = 1000;
        let delayMax = 300;

        let trans = (to)  => {
        if ( to === time || to < 0 || to >= years.length)
        {
            return;
        }
        let current = time;
        time = to;
        graphLayer.selectAll('.vote')
            .filter((d) => {return d[current].label!== d[time].label || d[current].idx!== d[time].idx;})
            .transition()
            .duration(duration)
            .delay((d) =>{return Math.random()*delayMax;})
            .attr('cx',(d)=>{return ((d[time].label!=null)?(xScale(d[time].label)+xLocalScale(d[time].idx%barWidth)+radius+mar):(dim.graphWidth/2));})
            .attr('cy',(d)=>{return ((d[time].label!=null)?(yScale(Math.floor((d[time].idx+0.1)/barWidth))-radius-mar):0);})
            .style('opacity',(d)=>{return (d[time].label!=null) ? 1: 0.0;})
            .style('fill',(d)=>{return colorScale(d[time].label);});

        inputLayer.select('.cursor').transition().duration(duration/2)
            .attr('x',(d)=>{return inputScale(this.state.timePeriods[time]);});
        inputLayer.selectAll('.button text').transition().duration(duration/2)
            .style('fill',function(d,i){return (i===time)?'#FFF':'#000';})
        }

        function prev() {
        trans(time-1);
        }

        function next(){
        trans(time+1);
        }

        d3.csv(csvData, (error,raw) => {
        if (error != null) {
            console.log(error);
            return;
        }
        years = d3.set(raw.map(function(d){return d[yearLabel];})).values();
        let parties = d3.keys(raw[0]).filter(function(d){return d !== yearLabel;});
        let partDict = {};
        parties.forEach(function(d,i) {
            partDict[d] = i;
        });
        let sums = {};
        let data = {};
        years.forEach(function(year) {
            data[year] = parties.map(function(party) {
            return + raw.filter(function(d){return d[yearLabel] === year;})[0][party]||0;
            });
            sums[year] = d3.sum(data[year]);
        });
        
        let max = d3.max(years.map(function(d){return d3.max(data[d]);}));
        let nrow = Math.ceil(dim.graphHeight/(2*(radius+mar)));
        barWidth = Math.ceil(max/nrow);
        yScale.domain(d3.range(nrow));
        yAxis.tickValues(d3.range(nrow).filter(function(d){return d%10===0;}));
        yAxis.tickFormat(function(d){return (d*barWidth);});
        xScale.domain(parties.map(function(d,i){return i;}));
        xAxis.tickFormat(function(d){return parties[d];});
        xAxisObj.call(xAxis);
        yAxisObj.call(yAxis);
        xLocalScale.rangeBands([0,xScale.rangeBand()]).domain(d3.range(barWidth));
        colorScale.domain(d3.range(parties.length));


        /**
         * Create buttons
         */
        inputScale.domain(this.state.timePeriods);
        inputLayer.append('rect')
            .attr('class','cursor')
            .attr({x:0,y:0,height:inputHeight,width:inputScale.rangeBand()})
            .style('stroke','#FFF')
            .style('stroke-width',2)
            .style('fill','#000');
        let timePeriods = this.state.timePeriods
        let buttons = inputLayer.selectAll('.button')
            .data(this.state.timePeriods)
            .enter()
            .append('g')
            .attr('class','button')
            .attr('transform',function(d){return 'translate(' + inputScale(d) + ',' + 0 +')';})
            .on('click',function(){
                let s = d3.select(this);
                trans(timePeriods.indexOf(s.datum()));
            });
            /**
             * Fill the buttons
             */
        buttons.append('rect')
            .attr({x:0,y:0,height:inputHeight,width:inputScale.rangeBand()})
            .style('stroke','#FFF')
            .style('stroke-width',2)
            .style('fill','rgba(0,0,0,0.1)');

            /**
             * Place text in buttons
             */
        buttons.append('text')
            .text(function(d){return d;})
            .attr('x',function(d){return inputScale.rangeBand()/2;})
            .attr('y',0)
            .style('fill',function(d,i){return (i===0)?'#FFF':'#000';})
            .style('text-anchor','middle')
            .style('font',inputHeight+'px "Lucida Grande", Helvetica, Arial, sans-serif').style('dominant-baseline','text-before-edge');

        let summax = d3.max(years.map(function(d){return sums[d];}));
        let displaydata = d3.range(summax).map(function(d){return [];});
        let indexMargin = 0;
        parties.forEach(function(party,partyidx)
        {
            for (let i=0;i<data[years[0]][partyidx];++i)
            {
            displaydata[indexMargin+i].push({label:partyidx,idx:i});
            }
            indexMargin += data[years[0]][partyidx];
        });
        for (let i=indexMargin;i<summax;++i){
            displaydata[i].push({label:null,idx:null});
        }
        d3.range(1,years.length).forEach(function(idx) {
            let year = years[idx];
            let lastyear = years[idx-1];
            let yearidx = idx;
            let pool = [];
            let unused = [];
            let keep = [];
            displaydata.forEach(function(d,i) {
            let copy = {label:d[yearidx-1].label,idx:d[yearidx-1].idx};
            d.push(copy);
            if ( d[yearidx].label == null) {
                unused.push(i);
            }
            else {
                if(data[year][d[yearidx].label] <= d[yearidx].idx) {
                pool.push(i);
                }
                else {
                keep.push(i);
                }
            }
            });
            d3.shuffle(pool);
            if ( sums[year] - sums[lastyear] > 0 ) {
            pool = pool.concat(unused.splice(0,sums[year]-sums[lastyear]));
            d3.shuffle(pool);
            }
            else {
            pool.splice(sums[year]-keep.length).forEach(function(d)
            {
                displaydata[d][yearidx] = {label:null,idx:null};
            });
            pool = pool.splice(0,sums[year]-keep.length);
            }
            let poolmargin = 0;
            parties.forEach((party) => {
            if (data[year][partDict[party]] - data[lastyear][partDict[party]] > 0) {
                for(let i=0;i<(data[year][partDict[party]]-data[lastyear][partDict[party]]);++i) {
                displaydata[pool[poolmargin+i]][yearidx] = {label:partDict[party],idx:i+data[lastyear][partDict[party]]};
                };
                poolmargin += data[year][partDict[party]]-data[lastyear][partDict[party]];
            }
            });
        });

        graphLayer.selectAll('.vote')
            .data(displaydata)
            .enter()
            .append('circle')
            .attr('class','vote')
            .attr('r',radius)
            .attr('cx',function(d){return ((d[time].label!=null)?(xScale(d[time].label)+xLocalScale(d[time].idx%barWidth)+radius+mar):(dim.graphWidth/2));})
            .attr('cy',function(d){return ((d[time].label!=null)?(yScale(Math.floor((d[time].idx+0.1)/barWidth))-radius-mar):0);})
            .style('opacity',(d)=>{return (d[time].label!=null) ? 1: 0.0;})
            .style('fill',function(d){return colorScale(d[time].label);});
            
        });
    }
    
    render() {
        return (
            <g></g>
        )
    }
}

export default Timeline


