<template>
  <div id="route-dist"></div>
  <div id="donut-chart"></div>
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
     console.log(this.routes);
     this.routeData = this.getTotals(this.routes);
     console.log(this.routeData);
   },
   ready(){
     if(google && google.visualization){
       this.drawChart(this.routeData);
       this.drawDonutChart(this.routes);
     } else {
       if(!window.googleChartsCallbacks){
         window.googleChartsCallbacks = [];
       }
       window.googleChartsCallbacks.push(function(){
         this.drawChart(this.routeData);
         this.drawDonutChart(this.routes);
       }.bind(this));
     }
   },

   methods: {
     drawChart(routeData){
       /* var data = new google.visualization.DataTable();
          for(var column in routeData){
          console.log(column);

          };
          data.addColumn("string", "1");
          data.addColumn("number", "1");
          data.addColumn("number", "2");
          data.addColumn("number", "3");
          data.addColumn("number", "4");
          data.addColumn("number", "5");

          data.addRows([
	  ["23/10",14,1,3,0,1],
          ["24/10",10,1,0,2,2],
          ["25/10",3,1,0,0,2]
          ]);
        */

       var rows = [];
       for(var column in routeData){
         console.log(column);
         console.log(routeData[column]);
         var row = []
         row.push(column)
       };

       var data = google.visualization.arrayToDataTable([
         ['Average Grade', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
          'Western', 'Literature', { role: 'annotation'}],
         ['2010', 10, 24, 20, 32, 18, 5, ''],
         ['2020', 16, 22, 23, 30, 16, 9, ''],
         ['2030', 28, 19, 29, 30, 12, 13, '']
       ]);


       var options = {
	 legend: {position: "none"},
	 isStacked: true
       };


       var chart = new google.charts.Bar(document.getElementById("route-dist"));
       chart.draw(data, google.charts.Bar.convertOptions(options));
     },

     drawDonutChart(routes){
       console.log(routes);
       var slices = {};
       var data = google.visualization.arrayToDataTable([
         ['Task', 'Hours per Day'],
         ['Work',     11],
         ['Eat',      2],
         ['Commute',  2],
         ['Watch TV', 2],
         ['Sleep',    7],
       ]);

       var options = {
         legend: 'none',
         pieSliceText: 'none',
         pieHole: 0.4,
         slices: slices
       };

       var chart = new google.visualization.PieChart(document.getElementById('donut-chart'));
       chart.draw(data, options);

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
       console.log(grades);
       return grades;
     },
     drawChart1(){
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
         width:900,
         height:500,
         // colors:colors,
         backgroundColor:'transparent',
         // series:series,
         animation:{
           startup:true
         },
         legend:{
           position: 'none'
         },
         chartArea:{
           left:"10%",
           top:"5%",
           width:'90%',
           height:'90%'
         },
         bar:{
           groupWidth:'45%'
         },
         vAxis:{
           gridlines:{
             count:-1
           }
         }
       };

       // Instantiate and draw our chart, passing in some options.
       this.chart1 = new google.visualization.ColumnChart(document.getElementById('route-dist'));
       this.chart1.draw(data, options);
       // material chart (sorta broke)
       // this.chart1 = new google.charts.Bar(this.chart1Div.get(0));
       // google.charts.Bar.convertOptions(options)
       // this.chart1.draw(data, options);
     }
   },
 }
</script>

<style lang="sass">
 #route-dist {

 }
</style>
