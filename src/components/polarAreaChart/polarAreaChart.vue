<template>
  <div id="polar-area-chart">
    <canvas id="polar-area-chart-canvas"></canvas>
    <p>Select a color to view number of routes</p>
  </div>
</template>

<script>
 import RouteModel from '../../models/RouteModel.js'
 import BaseComponent from '../base/baseComponent.vue'

 var PolarAreaChart = BaseComponent.extend({
   name: 'PolarAreaChart',
   props: ['routes'],
   data(){
     return {
       colorsArray:['Gray','Yellow','Green','Red','Blue','Orange','Purple','Black'],
       gradesArray:['v0','v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12']
     }
   },
   ready(){
     let data = this.formatData(this.routes);
     let options = {};
     this.ctx = document.getElementById("polar-area-chart-canvas");
     this.formatData(this.routes);
     this.draw(data, options);
   },

   methods: {
     draw(data, options){
       this.chart = new Chart(this.ctx, {
         type: "polarArea",
         data: data,
         options: options
       });
     },
     formatData(routes){
       let data = {
         datasets: [{
           data: [],
           backgroundColor: []
         }],
         labels: []
       };

       var routeData = {};
       routes.forEach(route => {
         if(typeof routeData[route.attributes.color] === "undefined"){
           routeData[route.attributes.color] = {};
           routeData[route.attributes.color].total = 0;
         }
         routeData[route.attributes.color].total++;
       });

       //Create Rows for chart
       for(var color in routeData){
         data.datasets[0].data.push(routeData[color].total);
         data.datasets[0].backgroundColor.push(window.colorMappings[color]);
         data.labels.push(color);
       }
       return data;
     }
   }
 });

 export default PolarAreaChart;
</script>

<style lang="sass">
 @import '../../styles/main.scss';

 #polar-area-chart {
   display: flex;
   flex-grow: 1;
   flex-wrap: wrap;
   position: relative;
   padding-bottom: .8em;
   canvas {
     flex-basis: 100%;
     width: 100%;
   }

   p {
     padding-bottom: .8em;
     font-size: .85em;
     color: $color-base-gray;
     width: 100%;
     bottom: 0;
     left: 0;
     text-align: center;
     position: absolute;
   }
 }
</style>
