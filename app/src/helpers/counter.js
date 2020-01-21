// export function countobjects(filterType) {
//     // console.log(filterType, this.state.updateData)
//     if(this.props.combinedData.length > 0 && this.state.updateData) {
//         let filter;
//         let counter = this.state.timePeroidCounts;
//         let newcountTracker = [];
//         let newCounter = [];
//         let combinedData = this.props.combinedData;

//         if(filterType === 'period') {
//                 filter = this.state.selectedTimeFilter;
//             if(this.state.selectedTimeFilter.length <= 0){
//                 filter = this.state.timePeriods
//             }

//             let timeFilter;
//             if(this.state.timeToggle === true) {
//                 timeFilter = this.state.CollectingTimeFilter;
//             } else {
//                 timeFilter = this.state.collectingHours
//             }
            
//             combinedData.forEach(dataElement => {
//                 if(dataElement.time && dataElement.time.length === 8){
//                     let time = dataElement.time;
//                     dataElement.time = time.substring(0,2)
//                 }
//                 if(filter.includes(dataElement.Chronology1stImpression) && timeFilter.includes(dataElement.time)){ 
//                     counter.forEach(timeperiod => {
//                         if(timeperiod.period === dataElement.Chronology1stImpression){ 
//                             if(!newcountTracker.includes(timeperiod.period)){
//                                 newcountTracker.push(timeperiod.period)
//                                 newCounter.push(timeperiod)
//                             }
//                             timeperiod.count += 1 
//                             timeperiod.objects.push(dataElement)
//                         } 
//                     })
//                 }
//             })
//         } else if (filterType === 'time') {
//             filter = this.state.CollectingTimeFilter;
//             if(this.state.CollectingTimeFilter.length <= 0){
//                 filter = this.state.collectingHours
//             }
//             let periodFilter;
//             if(this.state.periodToggle === true) {
//                 periodFilter = this.state.selectedTimeFilter;
//             } else {
//                 periodFilter = this.state.timePeriods
//             }

//             counter = this.state.currentCount
//             combinedData.forEach(dataElement => {
//                 if(dataElement.time && dataElement.time.length === 8){
//                     let time = dataElement.time;
//                     dataElement.time = time.substring(0,2)
//                 }
//                 if(filter.includes(dataElement.time) && periodFilter.includes(dataElement.Chronology1stImpression)){ 
//                     counter.forEach(timeperiod => {
//                         if(timeperiod.period === dataElement.time){ 
//                             if(!newcountTracker.includes(timeperiod.period)){
//                                 newcountTracker.push(timeperiod.period)
//                                 newCounter.push(timeperiod)
//                             }
//                             timeperiod.count += 1 
//                             timeperiod.objects.push(dataElement)
//                         } 
//                     })
//                 }
//             })
//         }
//     }
//     console.log(newCounter)
//     return newCounter
// }