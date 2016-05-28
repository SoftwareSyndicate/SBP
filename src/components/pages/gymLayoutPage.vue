<template>
  <div class="gym-layout-page">
    <div class="wall-header-container" v-if="routes.length > 0">
      <wall-list-item :wall="wall" :routes="routes" :gym="true"></wall-list-item>
    </div>

    <div class="content-container">
      <div class="gym-nav-tabs">
        <p v-bind:class="{'active': distroActive}" @click.stop="changeTab('distro')">Distribution</p>
        <p v-bind:class="{'active': routesActive}" @click.stop="changeTab('routes')">Routes</p>
        <p @click.stop="showWallImage()"><i class="material-icons">photo</i>View Wall</p>
      </div>

      <div class="distro-container" v-if="distroActive">
        <!-- Polar Area Chart -->
        <!-- <div id="polar-area-chart-container" class="component">
             <div class="chart-header">
             <p>Circuit Distribution</p>
             </div>
             <polar-area-chart :routes="routes" v-if="routes.length > 0"></polar-area-chart>
             </div> -->

        <!-- Route Pie Chart -->
        <div id="route-pie-chart-container" class="component">
          <div class="chart-header">
            <p>Circuit Distribution</p>
          </div>
          <route-pie-chart :routes="routes" v-if="routes.length > 0"></route-pie-chart>
        </div>

        <!-- Route Dist -->
        <div id="route-dist-container" class="component">
          <div class="chart-header">
            <p>V-Grade Distribution</p>
          </div>
          <route-dist :routes="routes"  v-if="routes.length > 0"></route-dist>
        </div>
      </div>


      <!-- Route Table -->
      <div class="routes-container" v-if="routesActive">
        <route-table :routes="routes" :display-keys="routeKeys" v-if="routes.length > 0" class="component"></route-table>
      </div>
    </div>
  </div>
</template>
<script>
 import WallModel from '../../models/WallModel.js'
 import RouteModel from '../../models/RouteModel.js'
 import WallListItem from '../wallList/wallListItem.vue'
 import RouteList from '../routeList/routeList.vue'
 import RouteTable from '../routeTable/routeTable.vue'
 import PolarAreaChart from '../polarAreaChart/polarAreaChart.vue'
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
     PolarAreaChart,
     RouteDist,
     RouteList,
     RouteTable,
     RoutePieChart,
     WallListItem
   },
   created(){
     this.routes = RouteModel.allRoutes
   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "seattle bouldering project");
     this.notifications.notify('NavTabs.setActiveTab', 'layout');
     this.hideLoadingAnimation();
   },
   methods: {
     changeTab(tab){
       if(tab === 'distro'){
         RouteModel.saveRoutes();
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

   }
 });

 export default GymLayoutPage
</script>

<style lang="sass">
 @import '../../styles/main.scss';

 .gym-layout-page {
   display: flex;
   flex-wrap: wrap;

   .wall-header-container {
     display: flex;
     flex-grow: 1;
     flex-basis: 100%;
     margin-bottom: 2em;

     li.wall-list-item {
       border-radius: 0px !important;
       border-top: none !important;
       border-right: none !important;
       border-left: none !important;
       &:hover {
         cursor: auto !important;
         background-color: white !important;
       }
     }

     .wall-list-item .left .name-container {
       margin: 0px !important;
     }

     .color {
       height: 10px !important;
     }

     .name-container {
       padding-top: 1.8em;
       padding-bottom: .5em;
       margin: 0px !important;
     }

     h5 {
       font-size: .95em !important;
       text-transform: none !important;
       font-weight: 500 !important;
       color: rgba(0, 0, 0, .3) !important;
       padding-left: 10px !important;
     }

     p {
       padding-left: 10px !important;
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

     .gym-nav-tabs {
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
           color: $color-base-orange !important;
           border-bottom: 2px solid $color-base-orange;
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
         padding-bottom: 4em;
         margin-bottom: 2em;
         height: 40vh;
         flex-basis: 100%;
       }

       #polar-area-chart-container {
         display: flex;
         flex-grow: 1;
         flex-wrap: wrap;
         margin: auto;
         margin-bottom: 2em;
         height: 40vh;
         flex-basis: 100%;

         .chart-header {
           margin-bottom: 1em;
         }
       }

       #route-pie-chart-container {
         display: flex;
         flex-grow: 1;
         flex-wrap: wrap;
         margin: auto;
         margin-bottom: 2em;
         flex-basis: 100%;
         padding-bottom: 1em;

         .chart-header {
           margin-bottom: 1em;
         }
       }

       .chart-header {
         height: 42px;
         padding: 1em;
         flex-grow: 1;
         flex-basis: 100%;
         font-size: .9em;
         font-weight: bold;
         color: rgba(0, 0, 0, .5) !important;
         border-bottom: $component-border;
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
