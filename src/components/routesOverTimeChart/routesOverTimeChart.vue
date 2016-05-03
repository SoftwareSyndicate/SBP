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
         this.formatData(this.routes);
         this.draw()
       }
     },
     draw(){
       console.log(this.lineData);
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
     formatData(routes){
       //First lets determine the date range of sent routes
       var min = new Date();
       var max = new Date();
       max.setFullYear(1980);

       routes.sort(function(a, b) {
         if(a.createdAt > b.createdAt){
           return 1;
         } else if(a.createdAt < b.createdAt) {
           return -1;
         } else {
           return 0;
         }
       });

       this.routes.forEach(route => {
         if(route.createdAt > max){
           max = route.createdAt;
         }
         if(route.createdAt < min){
           min = route.createdAt;
         }
       });

       var days = Math.round((max-min)/(1000*60*60*24));
       var dateStringOptions;
       var lineData = {
         labels: [],
         datasets: [{
           label: "Routes Sent",
           borderColor:  "rgba(255, 109, 0, .8)",
           backgroundColor: "rgba(255, 109, 0, .4)",
           data: []
         }],
       }
       if(days < 8){
         dateStringOptions = {weekday: 'long'};
       } else if (days < 57){
         dateStringOptions = {month: 'numeric', day: 'numeric'};
       } else {
         dateStringOptions = {month: 'short'};
       }
       this.lineData = this.groupByDate(dateStringOptions, lineData, routes);
     },

     groupByDate(dateStringOptions, lineData, routes){
       var dateObj = {};
       routes.forEach(route => {
         var name = route.createdAt.toLocaleDateString('en-US', dateStringOptions);
         if(dateObj[name]){
           dateObj[name]++;
         } else {
           dateObj[name] = 1;
         }
       });
       for(var name in dateObj){
         lineData.labels.push(name);
         lineData.datasets[0].data.push(dateObj[name]);
       }
       return lineData;
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
