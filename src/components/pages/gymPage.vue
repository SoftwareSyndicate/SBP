<template>
  <div class="gym-page">
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <nav-tabs></nav-tabs>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'
 import NavTabs from '../navTabs/navTabs.vue'

 var GymPage = BaseComponent.extend({
   name: 'GymPage',
   components: {
     NavTabs
   },
   data(){
     return {

     }
   },
   created(){
     this.notifications.notify('Navbar.setHeader', "seattle bouldering project");
   },
   ready(){

   },
   methods: {

   },

   beforeDestroy(){
     window.scrollTo(0, 0);
   }
 });

 export default GymPage;
</script>

<style lang="scss">
 .gym-page {
   .content-wrapper {
     width: 100%;
   }
 }

</style>
