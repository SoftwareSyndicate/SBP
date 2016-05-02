<template>
  <div class="routes-over-time-chart">
    <canvas id="routes-over-time-chart"></canvas>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'
 import RouteModel from '../../models/RouteModel.js'
 var RoutesOverTimeChart =  BaseComponent.extend({
   name: 'RoutesOverTimeChart',
   props: ['routes'],
   data(){
     return {
       routeData: []
     }
   },
   created(){
     this.notifications.listenFor("RouteModel.sentRoutesUpdated", this.onSentRoutesUpdated, this);
   },
   ready(){
     this.ctx = document.getElementById("routes-over-time-chart");
     this.redraw();
   },
   beforeDestroy(){
     this.notifications.removeListener("RouteModel.sentRoutesUpdated", this.onSentRoutesUpdated);
   },
   methods: {
     onSentRoutesUpdated(){
       this.routes = RouteModel.sentRoutes;
       Chart.defaults.global.elements.line.borderWidth = 2;
       Chart.defaults.global.elements.arc.borderWidth = 2;
       Chart.defaults.global.elements.point.radius = 0;
       Chart.defaults.global.title.display = false;
       Chart.defaults.global.legend.display = false;
       this.redraw();
     },
     redraw(){
       if(this.routes.length > 0){
         this.formatData();
         this.draw()
       }
     },
     draw(){
       var myChart = new Chart(this.ctx, {
         type: 'line',
         data: this.lineData,
         options: {
           scaleShowGridLines: false,
           scaleShowVerticalLines: false,
           scales: {
             display: false,
             yAxes: [{
               ticks: {
                 beginAtZero:true
               }
             }]
           }
         }
       });
     },
     formatData(){
       this.addRoutesLine(this.routes);
     },
     addRoutesLine(routes){
       var options = {month: 'long'};
       this.lineData = {
         labels: [],
         datasets: [{
           label: "Routes Sent",
           borderColor:  "rgba(255, 109, 0, .8)",
           backgroundColor: "rgba(255, 109, 0, .4)",
           data: []
         }],
       }

       routes.forEach(route => {
         this.lineData.labels.push(route.createdAt.toLocaleDateString('en-US', options));
         this.lineData.datasets[0].data.push(parseInt(route.attributes.route.attributes.grade));
       });
     }
   }
 });
 export default RoutesOverTimeChart
</script>

<style lang="sass">
 @import "../../styles/main.scss";
 .routes-over-time-chart {
   display: flex;
   flex-grow: 1;
   flex-direction: column;

   #routes-over-time-chart {
     width: 100% !important;
     height: 100% !important;
   }
 }
</style>
