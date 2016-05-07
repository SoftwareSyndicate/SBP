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
     this.showLoadingAnimation();
     this.walls = WallModel.walls;
   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "seattle bouldering project");
     this.notifications.notify('NavTabs.setActiveTab', 'walls');
     this.hideLoadingAnimation();
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
