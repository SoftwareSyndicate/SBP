<template>
  <div class="wall-page">
    <wall-list-item :wall="wall" v-if="!!wall"></wall-list-item>

    <div id="route-pie-chart-container">
      <route-pie-chart :routes="routes"  v-if="!!wall"></route-pie-chart>
    </div>

    <div id="route-dist-container">
      <route-dist :routes="routes"  v-if="!!wall"></route-dist>
    </div>

      <!-- Routes Tab -->
      <!-- <div id="tab-routes" class="col s12">
           <route-list :routes="routes" :display-keys="routeKeys"></route-list>
           </div> -->

      <!-- Info Tab -->
      <!-- <div id="tab-map" class="col s12">
           <img v-bind:src="wall.attributes.image.url()" id="wall-image">
           </div> -->
  </div>
</template>
<script>
 import WallModel from '../../models/WallModel.js'
 import WallListItem from '../wallList/wallListItem.vue'
 import RouteModel from '../../models/RouteModel.js'
 import RouteList from '../routeList/routeList.vue'
 import RouteDist from '../routeDist/routeDist.vue'
 import RoutePieChart from '../routePieChart/routePieChart.vue'
 import Notifications from '../../services/NotificationService'
 import BaseComponent from '../../components/base/baseComponent.vue'

 var WallPage = BaseComponent.extend({
   name: 'WallPage',
   components: {
     RouteDist,
     RouteList,
     RoutePieChart,
     WallListItem
   },
   data(){
     return {
       wall: null,
       routes: [],
       routeKeys: ['grade', 'sends', 'sent']
     }
   },
   created(){
     this.getWall();
   },
   ready(){

   },
   methods: {
     getWall(){
       this.showLoadingAnimation();
       var wallId = this.$route.params.wallId;
       WallModel.getWallById(wallId).then(results => {
         this.wall = results;
         this.routes = results.attributes.routes;
         Notifications.notify('Navbar.setHeader', this.wall.attributes.name);
         this.hideLoadingAnimation();
       });
     },
     changeTab(tab){
       if(tab === "info"){
         this.infoTabVisible = true;
         this.distroTabVisible = false;
         this.routesTabVisible = false;
       } else if(tab === "distro"){
         this.infoTabVisible = false;
         this.distroTabVisible = true;
         this.routesTabVisible = false;
       } else if(tab === "routes"){
         this.infoTabVisible = false;
         this.distroTabVisible = false;
         this.routesTabVisible = true;
       }
     }
   },

   beforeDestroy(){
     window.scrollTo(0, 0);
   }
 });

 export default WallPage;

</script>

<style lang="sass">
 .wall-page {
   .tabs {
     margin-bottom: 1em;
     position: fixed;
     z-index: 2;

     li.tab {
       position: relative;
       float: none;

       &.active {
         box-shadow: none;
       }
     }
   }

   #route-dist-container {
     height: 40vh;
   }

   #route-pie-chart-container {
     margin-top: 2em;
     height: 40vh;
   }

   #wall-image {
     width: 100%;
     height: 100%;
   }
 }
</style>
