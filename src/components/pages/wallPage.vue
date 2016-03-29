<template>
  <div class="wall-page">
    <!-- <ul class="tabs z-depth-1">
         <li class="tab col s3 z-depth-1" v-bind:class="{'active': distroTabVisible}" @click="changeTab('distro')">
         <a href="#tab-distro" class="">Distro</a>
         </li>
         <li class="tab col s3 z-depth-1" v-bind:class="{'active': routesTabVisible}" @click="changeTab('routes')">
         <a href="#tab-routes" class="">Routes</a>
         </li>
         <li class="tab col s3 z-depth-1" v-bind:class="{'active': mapTabVisible}" @click="changeTab('map')">
         <a href="#tab-map" class="">Map</a>
         </li>
         </ul> -->

    <div class="content-wrapper">
      <!-- Distro Tab -->
      <div id="tab-distro" class="col s12">
        <ul class="wall-list collection z-depth-1">
          <wall-list-item :wall="wall" v-if="!!wall.attributes"></wall-list-item>
        </ul>

        <!-- <div id="route-dist-container">
             <route-dist :routes="routes"  v-if="!!wall"></route-dist>
             </div> -->
        <div id="route-pie-chart-container">
          <route-pie-chart :routes="routes"  v-if="!!wall"></route-pie-chart>
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

 export default {
   name: 'WallPage',
   components: {
     RouteDist,
     RouteList,
     RoutePieChart,
     WallListItem
   },
   data(){
     return {
       distroTabVisible: true,
       routesTabVisible: false,
       infoTabVisible: false,
       wall: null,
       routes: [],
       routeKeys: ['grade', 'sends', 'sent']
     }
   },
   created(){
     this.getWall();
     $("#wrapper").css("width", "100%");
   },
   ready(){
     $('ul.tabs').tabs();
   },
   methods: {
     getWall(){
       var wallId = window.location.href.split("/")[window.location.href.split("/").length - 1];
       WallModel.getWallById(wallId).then(results => {
         this.wall = results;
         this.routes = results.attributes.routes;
         //Notifications.notify('Navbar.setHeader', this.wall.attributes.name);
         //Notifications.notify('Navbar.setHeader', "Walls");
         Notifications.notify('Overlay.setVisible', false);
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
     Notifications.notify('Overlay.setVisible', true);
     $("#wrapper").css("width", "85%");
     window.scrollTo(0, 0);
   }

 };
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

    .content-wrapper {
      //margin-top: 60px;
    }

    #route-dist-container {

    }

    #route-pie-chart-container {
      height: 40vh;
    }

    #wall-image {
      width: 100%;
      height: 100%;
    }
  }
</style>
