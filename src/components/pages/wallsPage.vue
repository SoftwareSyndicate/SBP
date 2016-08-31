<template>
  <div class="walls-page">
    <wall-list :walls="walls"></wall-list>
  </div>
</template>

<script>
 import WallList from '../wallList/wallList.vue'
 import WallModel from '../../RMS/src/models/WallModel.js'
 import RouteModel from '../../RMS/src/models/RouteModel.js'

 import BaseComponent from '../../RMS/src/components/base/baseComponent.vue'

 var WallsPage =  BaseComponent.extend({
   name: 'WallsPage',
   components: {
     WallList
   },
   data(){
     return {
       walls: WallModel.walls
     }
   },
   created(){

   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "Recently Updated");
     this.onWallsUpdated();
   },
   beforeDestroy(){

   },
   notifs(){
     return {
       "WallModel.wallsUpdated": "onWallsUpdated",
       "RouteModel.routesUpdated": "parseRoutes"
     }
   },

   methods: {
     onWallsUpdated(e){
       this.walls = WallModel.walls;
       this.parseRoutes();
     },
     parseRoutes(){
       this.walls.forEach(wall => {
         wall.routes = [];
         RouteModel.routes.forEach(route => {
           if(route.wall_id === wall.id){
             wall.routes.push(route);
           }
         });
       });
     }
   }
 });

 export default WallsPage;
</script>

<style lang="scss">
 .walls-page {
   padding: 16px;

   .wall-list {
     padding-bottom: 40px;
   }

 }
</style>
