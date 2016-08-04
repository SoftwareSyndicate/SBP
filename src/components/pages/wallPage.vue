<template>
  <div class="wall-page">
    <div class="wall-header-container">
      <wall-list-item :wall="wall"></wall-list-item>
    </div>

    <div class="content-container">
      <div class="wall-nav-tabs">
        <p v-bind:class="{'active': currentTab === 'routes'}" @click.stop="currentTab = 'routes';">Routes</p>
        <p v-bind:class="{'active': currentTab === 'distro'}" @click.stop="currentTab = 'distro';">Distribution</p>

        <p @click.stop="showWallImage()"><i class="material-icons">photo</i>View Wall</p>
      </div>

      <div class="distro-container" v-if="currentTab == 'distro'">

        <!-- Routes Pie -->
        <div id="route-pie-chart-container" class="component">
          <div class="chart-header">
            <p>Circuit Distribution</p>
          </div>
          <route-pie-chart :routes="wall.routes" v-if="!!wall"></route-pie-chart>
        </div>

        <!-- Routes Dist -->
        <div id="route-dist-container" class="component">
          <div class="chart-header">
            <p>V-Grade Distribution</p>
          </div>
          <route-dist :routes.sync="wall.routes"  v-if="!!wall"></route-dist>
        </div>
      </div>

      <!-- Wall Image -->
      <!-- <img v-bind:src="wall.image.url()" v-show="imageVisible" id="wall-image"> -->
      <i class="material-icons" id="close-wall-image" v-show="imageVisible" @click.stop="closeWallImage()">clear</i>


      <!-- Routes Table -->
      <div class="routes-container component" v-if="currentTab == 'routes'">
        <route-table :routes="wall.routes" v-if="!!wall"></route-table>
      </div>
    </div>
  </div>
</template>
<script>
 import BaseComponent from '../../RMS/src/components/base/baseComponent.vue'

 import UserModel from '../../RMS/src/models/UserModel.js'
 import RouteModel from '../../RMS/src/models/RouteModel.js'
 import SentRouteModel from '../../RMS/src/models/SentRouteModel.js'
 import WallModel from '../../RMS/src/models/WallModel.js'

 import WallListItem from '../wallList/wallListItem.vue'
 import RouteList from '../routeList/routeList.vue'
 import RouteTable from '../routeTable/routeTable.vue'
 import RouteDist from '../routeDist/routeDist.vue'
 import RoutePieChart from '../routePieChart/routePieChart.vue'



 var WallPage = BaseComponent.extend({
   name: 'WallPage',
   components: {
     RouteDist,
     RouteList,
     RouteTable,
     RoutePieChart,
     WallListItem
   },
   data(){
     return {
       wall: {routes: []},
       routes: [],
       currentTab: 'routes',
       imageVisible: false
     }
   },
   created(){
     window.scrollTo(0, 0);
     this.wallName = "";
     this.onWallsUpdated();
   },
   ready(){
     this.notifications.notify('NavTabs.setActiveTab', "walls");
   },
   notifs(){
     return {
       "WallModel.wallsUpdated": "onWallsUpdated",
       "RouteModel.routesUpdated": "parseRoutes",
       "SentRouteModel.routesUpdated": "parseRoutes"
     }
   },

   methods: {
     onWallsUpdated(){
       this.walls = WallModel.walls;
       WallModel.walls.forEach(wall => {
         if(wall.id === this.$route.params.id){
           this.wall = wall;
         }
       });
       this.notifications.notify('Navbar.setHeader', this.wall.name);
       this.parseRoutes();
     },
     parseRoutes(){
       this.wall.routes = [];
       RouteModel.routes.forEach(route => {
         route.sent = false;
         route.grade = route.grade;
         route.actualColor = window.colorMappings[route.color];
         route.colorValue = this.findColorIndex(route.actualColor);

         SentRouteModel.routes.forEach(sentRoute => {
           if(route.id === sentRoute.route_id){
             route.sent = true;
           }
         });

         if(route.wall_id === this.wall.id){
           this.wall.routes.push(route);
         }
       });
       this.wall.routes = this.sortRoutes(this.wall.routes);
     },
     showWallImage(){
       if(this.wall.image){
         this.imageVisible = true;
         $("body").css("overflow", "hidden");
       } else {
         Materialize.toast('Sorry, no wall image yet!', 3000);
       }
     },

     closeWallImage(){
       this.imageVisible = false;
       $("body").css("overflow", "scroll");
     },

     sortRoutes(routes){
       routes.sort(function(a, b) {
         if(a.grade > b.grade){
           return 1;
         } else if(a.grade < b.grade) {
           return -1;
         } else {
           return 0;
         }
       });

       routes.sort(function(a, b){
         if(a.colorValue > b.colorValue){
           return 1;
         } else if(a.colorValue < b.colorValue){
           return -1;
         } else {
           return 0;
         }
       });
       routes.reverse();
       return routes;
     },

     findColorIndex(color){
       var value;
       switch(color){
         case "rgba(209,209,209, 0.8)":
           value = 0;
           break;
         case "rgba(255,210,28, 0.8)":
           value = 1;
           break;
         case "rgba(5,179,99, 0.9)":
           value = 2;
           break;
         case "rgba(243,23,38, 0.8)":
           value = 3;
           break;
         case "rgba(48,99,245, 0.8)":
           value = 4;
           break;
         case "rgba(252,109,33, 0.8)":
           value = 5;
           break;
         case "rgba(183,22,229,0.8)":
           value = 6;
           break;
         case "rgba(33,33,33,0.9)":
           value = 7;
           break;
       }
       return value;
     }
   },

   beforeDestroy(){

   }
 });

 export default WallPage;

</script>

<style lang="scss">
 @import '../../styles/main.scss';

 .wall-page {
   display: flex;
   flex-wrap: wrap;

   .wall-header-container {
     display: flex;
     flex-grow: 1;
     flex-basis: 100%;
     margin-bottom: 2em;


     li {
       border-radius: 0px !important;
       border-top: none !important;
       border-right: none !important;
       border-left: none !important;
       &:hover {
         cursor: auto !important;
         background-color: white !important;
       }
     }

     .color {
       height: 10px !important;
     }

     .left {
       padding-left: 10px !important;
     }

     .name-container {
       padding-top: 1.8em;
       padding-bottom: .5em;
       margin: 0px !important;

       h5 {
         margin-bottom: 0px !important;
       }
     }

     h5 {
       margin-bottom: 0px !important;
       font-size: .95em !important;
       text-transform: none !important;
       font-weight: 500 !important;
       color: rgba(0, 0, 0, .3) !important;
     }

     p {
       padding: 0px !important;
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

     .wall-nav-tabs {
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

       #polar-area-chart-container {
         display: flex;
         flex-grow: 1;
         flex-wrap: wrap;
         margin: auto;
         margin-bottom: 2em;
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
         padding-bottom: 1em;
         margin-bottom: 2em;
         flex-basis: 100%;

         .chart-header {
           margin-bottom: 1em;
         }
       }

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
       width: 100vw;
       height: 100vh;
       position: absolute;
       top: 0;
       left: 0;
       z-index: 999;
     }

     #close-wall-image {
       color: rgba(255, 255, 255, 1);
       cursor: pointer;
       font-size: 2em;
       width: 50px;
       height: 30px;
       position: absolute;
       top: 20px;
       right: 0;
       z-index: 9999;
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
