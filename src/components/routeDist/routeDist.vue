<template>
  <div id="route-dist">
    <svg id="route-dist-chart-svg"></svg>
    <p>Select a color to view number of routes</p>
  </div>
</template>

<script>
 export default {
   name: 'RouteDist',
   props: {
     routes: {
       type: Array,
       default: () => []
     }
   },
   data(){
     return {
       chartData: [],
       colorsArray:['Gray','Yellow','Green','Red','Blue','Orange','Purple','Black'],
       gradesArray:['v0','v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12']
     }
   },
   created(){
     /* if(this.routes){
        this.tableData = this.calculateGradeTotals(this.routes, window.colorsArray, window.gradesArray);
        } */
   },
   ready(){
     this.$watch('routes', val => {
       /* this.colors = []; */
       /* this.calcColorPercents(); */
       this.tableData = this.calculateGradeTotals(this.routes, window.colorsArray, window.gradesArray);
       this.drawChart(this.tableData);
     }, {
       deep: true,
       immediate: true
     });
     //this.drawChart(this.chartData);
     /* this.drawChart(this.tableData); */
   },

   methods: {
     drawChart(chartData){
       nv.addGraph(function() {
         var chart = nv.models.multiBarChart()
                       .showYAxis(false)        //Show the y-axis
                       .showXAxis(false)        //Show the x-axis
                       .reduceXTicks(false)
                       .stacked(true)
                       .rotateLabels(0)
                       .showLegend(false)
                       .showControls(false)
                       .groupSpacing(0.3)    //Distance between each group of bars.
           ;

         chart.tooltip.contentGenerator(function(data){
           return "<div style='color: white; background-color: rgba(0, 0, 0, .6); padding-left: 1em; padding-top: .5em; padding-right: 1em; padding-bottom: .5em;'><h6 style='font-size: 1.1em;'>" + data.data.size + "</h6><h6>" + data.data.key + " v" + data.data.x +  "</h6></div>";
         });

         chart.xAxis.tickFormat(d3.format(',1f'));
         chart.yAxis.tickFormat(d3.format(',1f'));

         d3.select('#route-dist-chart-svg')
           .datum(chartData)
           .call(chart);

         nv.utils.windowResize(chart.update);
         return chart;
       }.bind(this));
     },

     getTotals(routes){
       var chartData = [];
       $.each(routes, function(index,route){
         var colorFound = false;
         chartData.forEach(colorObj => {
           if(colorObj["key"] === route.color){
             colorFound = true;
             colorObj.values.forEach(value => {
               if(value.x === route.grade){
                 value.y++;
               }
             });
           }
         });

         if(!colorFound){
           var values = [];
           for(var i = 0; i < 12; i++){
             var value = {};
             value.x = i;
             value.y = 0;
             values.push(value);
           }
           var colorObj = {
             color: window.colorMappings[route.color],
             key: route.color,
             values: values,
           }
           chartData.push(colorObj);
         }
       }.bind(this));
       return chartData;
     },
     calculateGradeTotals(routes, colors, grades){
       var tableData = [];
       var chartData = [];

       colors.forEach(color => {
         let values = [];
         let x = 0;
         grades.forEach(grade => {
           let value = {
             x: x,
             y: 0,
             key: color.toLowerCase()
           };
           x++;
           values.push(value);
         });

         let colorObj = {
           key: color.toLowerCase(),
           color: window.colorMappings[color.toLowerCase()],
           values: values
         };
         chartData.push(colorObj);
       });

       routes.forEach(route => {
         chartData.forEach(colorObj => {
           if(colorObj.key.toLowerCase() === route.color.toLowerCase()){
             colorObj.values.forEach(value => {
               if(parseInt(value.x) === parseInt(route.grade)){
                 value.y++;
               }
             });
           }
         });
       });

       this.tableData = chartData;
       return chartData;
     }
   },
 }
</script>

<style lang="sass">
 @import '../../styles/main.scss';

 #route-dist {
   display: flex;
   flex-grow: 1;
   height: 100%;
   position: relative;

   #route-dist-chart-svg {
     flex-grow: 1;
     height: 100%;
   }

   .route-dist-tooltip {
     color: white;
     background-color: black;
   }

   p {
     font-size: .85em;
     color: $color-base-gray;
     position: absolute;
     bottom: 10px;
     width: 100%;
     left: 0px;
     text-align: center;
   }
 }
</style>
