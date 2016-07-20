<template>
  <div id="pie-chart">
    <canvas id="pie-chart-canvas"></canvas>
    <p>Select a color to view number of routes</p>
  </div>
</template>

<script>
 import RouteModel from '../../models/RouteModel.js';
 import BaseComponent from '../base/baseComponent.vue'

 var RoutePieChart = BaseComponent.extend({
   name: 'RoutePieChart',
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
     this.ctx = document.getElementById("pie-chart-canvas");
     this.data = this.formatData(this.routes);
     this.draw(data, options);

     this.$watch('routes', val => {
       this.data = this.formatData(this.routes);
       this.chart.data.datasets[0] = this.data.datasets[0];
       this.chart.update();
     });
   },

   methods: {
     draw(data, options){
       this.chart = new Chart(this.ctx, {
         type: "doughnut",
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
         if(typeof routeData[route.color] === "undefined"){
           routeData[route.color] = {};
           routeData[route.color].total = 0;
         }
         routeData[route.color].total++;
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

 export default RoutePieChart;
</script>

<style lang="sass">
 @import '../../styles/main.scss';

 #pie-chart {
   margin: auto;

   p {
     text-align: center;
     font-size: .85em;
     color: $color-base-gray;
   }
 }
</style>
