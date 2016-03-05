<template>
  <div id="route-dist"></div>
</template>

<script>
 import RouteModel from '../../models/RouteModel.js';
 export default {
   name: 'RouteDist',
   props: ['routes'],
   created(){
   },
   ready(){
     console.log("ROTUSE: ", this.routes);
     if(google && google.visualization){
       this.drawChart();
     } else {
       if(!window.googleChartsCallbacks){
         window.googleChartsCallbacks = [];
       }
       window.googleChartsCallbacks.push(function(){
         this.drawChart();
       }.bind(this));
     }
   },

   methods: {
     drawChart(){
       var data = new google.visualization.DataTable();
       data.addColumn('string', 'Topping');
       data.addColumn('number', 'Slices');
       data.addRows([
         ['Mushrooms', 3],
         ['Onions', 1],
         ['Olives', 1],
         ['Zucchini', 1],
         ['Pepperoni', 2]
       ]);

       // Set chart options
       var options = {'title':'How Much Pizza I Ate Last Night',
                      'width':400,
                      'height':300};

       // Instantiate and draw our chart, passing in some options.
       var chart = new google.visualization.PieChart(document.getElementById('route-dist'));
       chart.draw(data, options);
     }
   }
 }
</script>

<style lang="sass">
 #route-dist {

 }
</style>
