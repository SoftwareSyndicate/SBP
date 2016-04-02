<template>
  <div class="gym-layout-page">
    <div id="route-dist-container" v-if="routes.length > 0" class="z-depth-1">
      <route-dist :routes="routes"></route-dist>
    </div>
    <div id="route-pie-chart-container" v-if="routes.length > 0" class="z-depth-1">
      <route-pie-chart :routes="routes"></route-pie-chart>
    </div>
  </div>
</template>

<script>
 import RouteModel from '../../models/RouteModel.js'
 import WallModel from '../../models/WallModel.js'
 import RouteDist from '../routeDist/routeDist.vue'
 import RoutePieChart from '../routePieChart/routePieChart.vue'
 import BaseComponent from '../base/baseComponent.vue'
 var GymLayoutPage = BaseComponent.extend({
   name: 'GymLayoutPage',
   data(){
     return {
       routes: [],
       walls: []
     }
   },
   components: {
     RouteDist,
     RoutePieChart
   },
   created(){
     this.notifications.notify('Navbar.setHeader', "seattle bouldering project");
     this.getRoutes();
   },
   ready(){

   },
   methods: {
     getRoutes(){
       this.showLoadingAnimation();
       return RouteModel.getRoutes().then(results => {
         this.routes = results;
         this.hideLoadingAnimation();
       });
     }
   },

   beforeDestroy(){
     this.showLoadingAnimation();
   }
 });

 export default GymLayoutPage
</script>

<style lang="sass">
 .gym-layout-page {

 }
</style>
