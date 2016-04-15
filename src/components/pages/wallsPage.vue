<template>
  <div class="walls-page">
    <wall-list :walls="walls" v-if="walls.length > 0"></wall-list>
  </div>
</template>

<script>
 import WallList from '../wallList/wallList.vue'
 import WallModel from '../../models/WallModel.js'
 import BaseComponent from '../../components/base/baseComponent.vue'
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
     this.notifications.notify('Navbar.setHeader', "seattle bouldering project");
     if(!WallModel.walls){
       WallModel.getWalls().then(results => {
         this.walls = results;
         this.notifications.notify('Overlay.setVisible', false);
       });
     } else {
       this.walls = WallModel.walls;
       this.notifications.notify('Overlay.setVisible', false);
     }
   },

   beforeDestroy(){
     window.scrollTo(0, 0);
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
