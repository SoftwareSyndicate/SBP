<template>
  <div id="route-pie-chart">
    <svg id="route-pie-chart-svg"></svg>
    <p>Select a color to view number of routes</p>
  </div>
</template>

<script>
 import RouteModel from '../../models/RouteModel.js';
 export default {
   name: 'RoutePieChart',
   props: ['routes'],
   data(){
     return {
       colorsArray:['Gray','Yellow','Green','Red','Blue','Orange','Purple','Black'],
       gradesArray:['v0','v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12']
     }
   },
   ready(){
     this.drawChart(this.routes);
   },

   methods: {
     drawChart(routes){
       var routeData = {};
       routes.forEach(route => {
         if(typeof routeData[route.attributes.color] === "undefined"){
           routeData[route.attributes.color] = {};
           routeData[route.attributes.color].total = 0;
         }
         routeData[route.attributes.color].total++;
       });

       //Create Rows for chart
       var rows = [];
       for(var color in routeData){
         var row = {
           color: window.colorMappings[color],
           label: color,
           value: routeData[color].total
         };
         rows.push(row);
       }

       nv.addGraph(function() {
         var chart = nv.models.pieChart()
                       .x(function(d) { return d.label })
                       .y(function(d) { return d.value })
                       .showLegend(false)
                       .valueFormat(d3.format("f"))
                       .showLabels(false)
                       .labelThreshold(1)
                       .labelType("percent") 
                       .donut(true)
                       .donutRatio(0.5)
           ;

         chart.tooltip.contentGenerator(function(data){
           return  "<div style='color: white; background-color: rgba(0, 0, 0, .6); padding-left: 1em; padding-top: .5em; padding-right: 1em; padding-bottom: .5em;'><h6 style='font-size: 1.1em;'>" + data.data.value + " " + data.data.label + "</h6></div>";
         });


         d3.select("#route-pie-chart svg")
           .datum(rows)
           .transition().duration(350)
           .call(chart);

         return chart;
       });
     }
   }
 }
</script>

<style lang="sass">
 @import '../../styles/main.scss';

 #route-pie-chart {
   display: flex;
   flex-grow: 1;
   height: 100%;
   position: relative;

   svg {
     flex-grow: 1;
     height: 100%;
   }

   p {
     font-size: .85em;
     color: $color-base-gray;
     position: absolute;
     bottom: 0px;
     width: 100%;
     left: 0px;
     text-align: center;
   }
 }
</style>
