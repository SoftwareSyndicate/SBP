<template>
  <div class="wall-page">
    Wall Page
    <div id="walldist"></div>
  </div>
</template>
<script>
 export default {
   name: 'WallPage',
   created(){
     this.$dispatch('update-navbar-header', "FS1");

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
     var chart = new google.visualization.PieChart(document.getElementById('walldist'));
     chart.draw(data, options);
   },
   components: {

   },
 };
</script>

<style>

</style>
