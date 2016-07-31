<template>
  <div class="routes-over-time-chart">
    <canvas id="routes-over-time-chart"></canvas>
  </div>
</template>

<script>
 import BaseComponent from '../../RMS/src/components/base/baseComponent.vue'
 import RouteModel from '../../RMS/src/models/RouteModel.js'
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
         if(a.created_at > b.created_at){
           return 1;
         } else if(a.created_at < b.created_at) {
           return -1;
         } else {
           return 0;
         }
       });

       this.routes.forEach(route => {
         if(route.created_at > max){
           max = route.created_at;
         }
         if(route.created_at < min){
           min = route.created_at;
         }
       });

       var days = Math.round((max-min)/(1000*60*60*24));
       var dateStringOptions;
       var lineData = {
         labels: [],
         datasets: [{
           label: "Routes Sent",
           borderColor: "rgba(243, 80, 30, .9)",
           backgroundColor: "rgba(243, 80, 30, .6)",
           data: []
         }],
       }

       if(days === 0){
         dateStringOptions = {hour: '2-digit'};
         lineData.labels.push("Joined");
         lineData.datasets[0].data.push(0);
       } else if(days < 7){
         dateStringOptions = {weekday: 'long'};
       } else if (days < 56){
         dateStringOptions = {month: 'numeric', day: 'numeric'};
       } else {
         dateStringOptions = {month: 'short'};
       }
       this.lineData = this.groupByDate(dateStringOptions, lineData, routes);
     },

     groupByDate(dateStringOptions, lineData, routes){
       var dateObj = {};
       routes.forEach(route => {
         var name = new Date(route.created_at).toLocaleDateString('en-US', dateStringOptions);
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
