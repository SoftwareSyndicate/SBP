<template>
  <div id="route-pie-chart"></div>
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
     if(google && google.visualization){
       this.drawChart(this.routes);
     } else {
       if(!window.googleChartsCallbacks){
         window.googleChartsCallbacks = [];
       }
       window.googleChartsCallbacks.push(function(){
         this.drawChart(this.routes);
       }.bind(this));
     }
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
       rows.push(['color', 'total']);
       for(var color in routeData){
         var row = [];
         row.push(color);
         row.push(routeData[color].total);
         rows.push(row);
       }

       var slices = {};
       var i = 0;
       rows.forEach(row => {
         if(row[0] !== "color"){
           var slice = {
             "color": row[0]
           };
           slices[i] = slice;
           i++;
         }
       });

       var data = google.visualization.arrayToDataTable(rows);

       var options = {
         legend: 'none',
         pieSliceText: 'none',
         pieHole: 0.5,
         slices: slices
       };

       var chart = new google.visualization.PieChart(document.getElementById('route-pie-chart'));
       chart.draw(data, options);
     }
   }
 }
</script>

<style lang="sass">
 #route-pie-chart {
   height: 100%;
 }
</style>
