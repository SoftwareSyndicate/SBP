<template>
  <div class="wall-page">
    <wall-dist :wall="wall"  v-if="!!wall"></wall-dist>
    {{wall.attributes.name}}
  </div>
</template>
<script>
 import WallModel from '../../models/WallModel.js';
 import WallDist from '../wallDist/wallDist.vue';
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
         console.log(results);
         //TODO emit event to navbar to update header
         this.wall = results;
       });
     },

   }
 };
</script>

<style lang="sass">

</style>
