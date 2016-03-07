<template>
  <div id="route-dist"></div>
</template>

<script>
 import RouteModel from '../../models/RouteModel.js';
 export default {
   name: 'RouteDist',
   props: ['routes'],
   data(){
     return {
       colorsArray:['Gray','Yellow','Green','Red','Blue','Orange','Purple','Black'],
       gradesArray:['v0','v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12']
     }
   },
   created(){
     this.routeData = this.getTotals(this.routes);
   },
   ready(){
     if(google && google.visualization){
       this.drawChart(this.routeData);
     } else {
       if(!window.googleChartsCallbacks){
         window.googleChartsCallbacks = [];
       }
       window.googleChartsCallbacks.push(function(){
         this.drawChart(this.routeData);
       }.bind(this));
     }
   },

   methods: {
     drawChart(routeData){
       var series = [];
       var data = new google.visualization.DataTable();

       // first column is grade
       data.addColumn('string', 'Grade');

       // add the color columns
       $.each(this.colorsArray, function(index, color){
         data.addColumn('number', color);
         // set up ideal tooltip
         // add the color style column
         data.addColumn({type: 'string', role: 'style'});
       }.bind(this));

       // add the rows
       var row;
       var routes;
       $.each(this.gradesArray, function(index, grade){
         row = [];
         row.push(grade);
         $.each(this.colorsArray, function(i, color){
           routes = this.grades[grade];

           if(routes){
             routes = this.grades[grade][color.toLowerCase()];
           }

           if(routes){
             row.push(routes.length);
           } else {
             row.push(0);
           }

           // add the data for the color style column
           row.push('color:'+color+';');
         }.bind(this));

         data.addRow(row);
       }.bind(this));

       var colors = this.colorsArray.map(function(color){
         return color.toLowerCase();
       });

       // Set chart options
       var options;
       options = {
         isStacked:true,
         // colors:colors,
         backgroundColor:'transparent',
         // series:series,
         animation:{
           startup:true
         },
         legend:{
           position: 'none'
         },
         bar:{
           groupWidth:'65%'
         },
         vAxis:{
           gridlines:{
             count:-1
           }
         }
       };

       // Instantiate and draw our chart, passing in some options.
       this.chart = new google.visualization.ColumnChart(document.getElementById('route-dist'));
       this.chart.draw(data, options);
     },

     getTotals(routes){
       var grades = {};
       $.each(routes, function(index,route){
         var gradeName = 'v'+route.get('grade');
         // get the grade array
         var gradeObject = grades[gradeName];
         if(!gradeObject){
           gradeObject = {};
           grades[gradeName] = gradeObject;
         }

         var colorName = route.get('color');
         // get the color array
         var colorArray = gradeObject[colorName];
         if(!colorArray){
           colorArray = [];
           gradeObject[colorName] = colorArray;
         }

         colorArray.push(route);
       }.bind(this));
       this.grades = grades;
       //this.gradesArray = grades;
       console.log("grades: ", grades);
       return grades;
     },
     drawChart1(){
     }
   },
 }
</script>

<style lang="sass">
 #route-dist {

 }
</style>
