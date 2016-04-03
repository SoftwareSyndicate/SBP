<template>
  <div class="wall-page">
    <div class="wall-header-container" v-if="!!wall">
      <wall-list-item :wall="wall"></wall-list-item>
    </div>

    <div class="content-container">
      <div class="nav-tabs">
        <p v-bind:class="{'active': routesActive}" @click.stop="changeTab('routes')">Routes</p>
        <p v-bind:class="{'active': distroActive}" @click.stop="changeTab('distro')">Distrobution</p>
        <p @click.stop="showWallImage()">View Wall</p>
      </div>

      <div class="distro-container" v-if="distroActive">
        <div id="route-pie-chart-container">
          <route-pie-chart :routes="routes"  v-if="!!wall"></route-pie-chart>
        </div>

        <div id="route-dist-container">
          <route-dist :routes="routes"  v-if="!!wall"></route-dist>
        </div>
      </div>


      <!-- Routes Tab -->
      <div class="routes-container" v-if="routesActive">
        <route-list :routes="routes" :display-keys="routeKeys"></route-list>
      </div>

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
       routeKeys: ['grade', 'sends', 'sent'],
       distroActive: true,
       routesActive: false
     }
   },
   created(){
     this.getWall();
     this.notifications.notify('Navbar.setNavigateBack', true);
   },
   ready(){

   },
   methods: {
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
     this.notifications.notify('Navbar.setNavigateBack', false);
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
       margin-bottom: 2em;

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


     .routes-container {
       display: flex;
       flex-grow: 1;
       flex-basis: 100%;
       margin-bottom: 50px;
     }
   }
 }
</style>
