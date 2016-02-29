<template>
  <div class="wall-page">
    <wall-dist :wall="wall"  v-if="!!wall"></wall-dist>
  </div>
</template>
<script>
 import WallModel from '../../models/WallModel.js';
 import WallDist from '../wallDist/wallDist.vue';
 import notifications from '../../services/NotificationService';

 export default {
   name: 'WallPage',
   data(){
     return {
       wall: null
     }
   },
   created(){
     this.$dispatch('update-navbar-header', "FS1");
     this.getWall();
   },
   components: {
     WallDist
   },

   methods: {
     getWall(){
       var wallId = window.location.href.split("/")[window.location.href.split("/").length - 1];
       WallModel.getWallById(wallId).then(results => {
         this.wall = results;
         notifications.notify('Navbar.setHeader', this.wall.attributes.name);
         notifications.notify('Overlay.setVisible', false);
       });
     }
   },

   beforeDestroy(){
     notifications.notify('Overlay.setVisible', true);
   }

 };
</script>

<style lang="sass">

</style>
