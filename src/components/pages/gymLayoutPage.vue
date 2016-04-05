<template>
  <div class="gym-layout-page">
    <div class="wall-header-container" v-if="routes.length > 0">
      <wall-list-item :wall="wall" :routes="routes" :gym="true"></wall-list-item>
    </div>

    <div class="content-container">
      <div class="nav-tabs">
        <p v-bind:class="{'active': routesActive}" @click.stop="changeTab('routes')">Routes</p>
        <p v-bind:class="{'active': distroActive}" @click.stop="changeTab('distro')">Distrobution</p>
        <p @click.stop="showWallImage()"><i class="material-icons">photo</i>View Wall</p>
      </div>

      <div class="distro-container" v-if="distroActive">
        <div id="route-pie-chart-container" class="z-depth-1">
          <div class="chart-header">
            <p>Circuit Distrobution</p>
          </div>
          <route-pie-chart :routes="routes" v-if="routes.length > 0"></route-pie-chart>
        </div>

        <div id="route-dist-container" class="z-depth-1">
          <div class="chart-header">
            <p>V-Grade Distrobution</p>
          </div>
          <route-dist :routes="routes"  v-if="routes.length > 0"></route-dist>
        </div>
      </div>


      <!-- Routes Tab -->
      <div class="routes-container z-depth-1" v-if="routesActive">
        <route-table :routes="routes" :display-keys="routeKeys" v-if="routes.length > 0"></route-table>
      </div>

      <!-- Info Tab -->
      <!-- <div id="tab-map" class="col s12">
           <img v-bind:src="wall.attributes.image.url()" id="wall-image">
           </div> -->
    </div>
  </div>
  <!-- <div class="gym-layout-page">
       <div id="route-dist-container" v-if="routes.length > 0" class="z-depth-1">
       <route-dist :routes="routes"></route-dist>
       </div>
       <div id="route-pie-chart-container" v-if="routes.length > 0" class="z-depth-1">
       <route-pie-chart :routes="routes"></route-pie-chart>
       </div>
       </div> -->
</template>

<script>
 import WallModel from '../../models/WallModel.js'
 import RouteModel from '../../models/RouteModel.js'
 import WallListItem from '../wallList/wallListItem.vue'
 import RouteList from '../routeList/routeList.vue'
 import RouteTable from '../routeTable/routeTable.vue'
 import RouteDist from '../routeDist/routeDist.vue'
 import RoutePieChart from '../routePieChart/routePieChart.vue'
 import BaseComponent from '../base/baseComponent.vue'

 var GymLayoutPage = BaseComponent.extend({
   name: 'GymLayoutPage',
   data(){
     return {
       wall: null,
       routes: [],
       walls: [],
       routeKeys: ['grade', 'sends', 'sent'],
       distroActive: true,
       routesActive: false
     }
   },
   components: {
     RouteDist,
     RouteList,
     RouteTable,
     RoutePieChart,
     WallListItem
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
     },
     getWall(){
       this.showLoadingAnimation();
       var wallId = this.$route.params.wallId;
       WallModel.getWallById(wallId).then(results => {
         this.notifications.notify('Navbar.setHeader', results.attributes.name);
         results.attributes.name = "Wall Last Set";
         this.wall = results;
         this.routes = results.attributes.routes;

         this.hideLoadingAnimation();
       });
     },
     changeTab(tab){
       if(tab === 'distro'){
         this.distroActive = true;
         this.routesActive = false;
       } else {
         this.distroActive = false;
         this.routesActive = true;
       }
     },
     showWallImage(){
       Materialize.toast('Sorry, no wall image yet!', 3000);
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
       margin-bottom: 2em;

       i {
         font-size: 1.2em;
         vertical-align: middle;
         margin-right: .3em;
       }

       p {
         color: rgba(0, 0, 0, .5) !important;
         margin-right: 1.5em !important;
         cursor: pointer;
         padding-left: 3px;
         padding-right: 3px;

         &:last-child {
           margin-right: 0px;
           margin-left: auto !important;
         }

         &.active {
           color: #ff6d00 !important;
           border-bottom: 2px solid #ff6d00;
         }
       }
     }

     .distro-container {
       margin-bottom: 50px;

       #route-dist-container {
         display: flex;
         flex-grow: 1;
         flex-wrap: wrap;
         margin: auto;
         padding-bottom: 3em;
         margin-bottom: 2em;
         height: 40vh;
         flex-basis: 100%;
       }

       #route-pie-chart-container {
         display: flex;
         flex-grow: 1;
         flex-wrap: wrap;
         margin: auto;
         padding-bottom: 3em;
         margin-bottom: 2em;
         height: 40vh;
         flex-basis: 100%;
       }

       .chart-header {
         padding: 1em;
         flex-grow: 1;
         flex-basis: 100%;
         font-size: .9em;
         font-weight: bold;
         color: rgba(0, 0, 0, .5) !important;
         border-bottom: 2px solid rgba(0, 0, 0, .05);
       }
     }

     #wall-image {
       width: 100%;
       height: 100%;
     }


     .routes-container {
       display: flex;
       flex-grow: 1;
       flex-basis: 100%;
       margin-bottom: 50px;
     }
   }
 }
</style>
