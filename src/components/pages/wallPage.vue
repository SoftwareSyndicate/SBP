<template>
  <div class="wall-page">

    <ul class="tabs z-depth-1">
      <li class="tab col s3" v-bind:class="{'z-depth-1': !distroTabVisible}" @click="changeTab('distro')"><a href="#tab-distro" class="#active">Distro</a></li>
      <li class="tab col s3" v-bind:class="{'z-depth-1': !routesTabVisible}" @click="changeTab('distro')"><a href="#tab-routes">Routes</a></li>
      <li class="tab col s3" v-bind:class="{'z-depth-1': !infoTabVisible}" @click="changeTab('info')"><a href="#tab-info">Info</a></li>
    </ul>

    <div class="content-wrapper">

      <!-- Distro Tab -->
      <div id="tab-distro" class="col s12">
        <route-dist :routes="routes"  v-if="!!wall"></route-dist>
      </div>

      <!-- Routes Tab -->
      <div id="tab-routes" class="col s12">
        <route-list :routes="routes" :display-keys="routeKeys"></route-list>
      </div>

      <!-- Info Tab -->
      <div id="tab-info" class="col s12">
        Info
      </div>
    </div>
  </div>
</template>
<script>
 import WallModel from '../../models/WallModel.js';
 import RouteModel from '../../models/RouteModel.js';
 import RouteList from '../routeList/routeList.vue'
 import RouteDist from '../routeDist/routeDist.vue'
 import Notifications from '../../services/NotificationService';

 export default {
   name: 'WallPage',
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
   },
   ready(){
     $('ul.tabs').tabs();
     $("#wrapper").css("width", "100%");
   },
   components: {
     RouteDist,
     RouteList
   },

   methods: {
     getWall(){
       var wallId = window.location.href.split("/")[window.location.href.split("/").length - 1];
       WallModel.getWallById(wallId).then(results => {
         this.wall = results;
         console.log(results);
         this.routes = results.attributes.routes;
         Notifications.notify('Navbar.setHeader', this.wall.attributes.name);
         Notifications.notify('Overlay.setVisible', false);
       });
     },
     changeTab(tab){
       console.log("change tab", tab);
       if(tab === "info"){
         this.infoTabVisible = true;
         this.distroTabVisible = false;
         this.routeTabVisible = false;
       } else if(tab === "distro"){
         this.infoTabVisible = false;
         this.distroTabVisible = true;
         this.routeTabVisible = false;
       } else if(tab === "sent"){
         this.infoTabVisible = false;
         this.distroTabVisible = false;
         this.sentTabVisible = true;
       }
     },
   },

   beforeDestroy(){
     Notifications.notify('Overlay.setVisible', true);
   }

 };
</script>

<style lang="sass">
 .wall-page {
   .tabs {
     margin-bottom: 1em;
   }

   .content-wrapper {
     width: 85%;
     margin-left: 7.5%;
   }
 }
</style>
