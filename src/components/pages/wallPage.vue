<template>
  <div class="wall-page">
    <div class="wall-header-container" v-if="!!wall">
      <wall-list-item :wall="wall"></wall-list-item>
    </div>

    <div class="content-container">
      <div class="nav-tabs">
        <p>Routes</p>
        <p>Distrobution</p>
        <p>Routes</p>
      </div>

      <div id="route-pie-chart-container">
        <route-pie-chart :routes="routes"  v-if="!!wall"></route-pie-chart>
      </div>

      <div id="route-dist-container">
        <route-dist :routes="routes"  v-if="!!wall"></route-dist>
      </div>
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
         Notifications.notify('Navbar.setHeader', results.attributes.name);
         results.attributes.name = "Wall Last Set";
         this.wall = results;
         this.routes = results.attributes.routes;

         this.hideLoadingAnimation();
       });
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
   display: flex;
   flex-wrap: wrap;

   .wall-header-container {
     display: flex;
     flex-grow: 1;
     flex-basis: 100%;
     margin-bottom: 2em;

     li {
       &:hover {
         cursor: auto !important;
         background-color: white !important;
       }
     }

     .color {
       height: 10px !important;
     }

     .name-container {
       padding-bottom: .5em;
     }

     h5 {
       font-size: .95em !important;
       text-transform: none !important;
       font-weight: 500 !important;
       color: rgba(0, 0, 0, .3) !important;
     }
     .right {
       flex-basis: 30%;
     }

     .spacer {
       display: none;
     }
   }

   .content-container {
     display: flex;
     flex-wrap: wrap;
     flex-grow: 1;
     margin: 16px;

     .nav-tabs {
       display: flex;
       flex-grow: 1;
       margin: auto;
     }
     #route-dist-container {
       flex-grow: 1;
       display: flex;
       height: 40vh;
       margin: auto;
       flex-basis: 100%;
     }

     #route-pie-chart-container {
       display: flex;
       flex-grow: 1;
       margin: auto;
       margin-bottom: 2em;
       height: 40vh;
       flex-basis: 100%;
     }

     #wall-image {
       width: 100%;
       height: 100%;
     }
   }
 }
</style>
