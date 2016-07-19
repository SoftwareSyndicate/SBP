<template>
  <div class="walls-page">
    <wall-list :walls="walls"></wall-list>
  </div>
</template>

<script>
 import WallList from '../wallList/wallList.vue'
 import WallModel from '../../RMS/src/models/WallModel.js'
 import BaseComponent from '../../RMS/src/components/base/baseComponent.vue'

 var WallsPage =  BaseComponent.extend({
   name: 'WallsPage',
   components: {
     WallList
   },
   data(){
     return {
       walls: []
     }
   },
   created(){
     this.walls = WallModel.walls;
   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "seattle bouldering project");
   },
   beforeDestroy(){

   },
   notifs(){
     return {
       "WallModel.wallsUpdated": "onWallsUpdated"
     }
   },

   methods: {
     onWallsUpdated(){
       this.walls = WallModel.walls;
     }
   }
 });

 export default WallsPage;
</script>

<style lang="sass">
 .walls-page {
   padding: 16px;

   .wall-list {
     padding-bottom: 40px;
   }

 }
</style>
