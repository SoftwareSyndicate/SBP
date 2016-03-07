<template>
  <div class="walls-page">
    <wall-list :walls="walls" v-if="walls.length > 0"></wall-list>
  </div>
</template>

<script>
 import WallList from '../wallList/wallList.vue'
 import notifications from '../../services/NotificationService.js'
 import WallModel from '../../models/WallModel.js'
 export default {
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
     notifications.notify('Navbar.setHeader', "Walls");
     notifications.notify('Navbar.setActiveTab', "walls");
     WallModel.getWalls().then(results => {
       this.walls = results;
       notifications.notify('Overlay.setVisible', false);
     });
   },

   beforeDestroy(){
     notifications.notify('Overlay.setVisible', true);
     window.scrollTo(0, 0);
   }

 };
</script>

<style>

</style>
