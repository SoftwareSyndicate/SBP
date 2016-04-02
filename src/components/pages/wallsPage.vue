<template>
  <div class="walls-page">
    <wall-list :walls="walls" v-if="walls.length > 0"></wall-list>
  </div>
</template>

<script>
 import WallList from '../wallList/wallList.vue'
 import notifications from '../../services/NotificationService.js'
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
     WallModel.getWalls().then(results => {
       this.walls = results;
       notifications.notify('Overlay.setVisible', false);
     });
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

 }
</style>
