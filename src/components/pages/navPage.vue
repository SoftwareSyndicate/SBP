<template>
  <div class="nav-page">
    nav page
  </div>
</template>
<script>

 import BaseComponent from '../../components/base/baseComponent.vue'

 var NavPage = BaseComponent.extend({
   name: 'NavPage',
   components: {

   },
   data(){
     return {
     }
   },
   created(){
     this.notifications.notify('Navbar.setNavigateBack', true);
   },
   ready(){

   },
   methods: {

   },

   beforeDestroy(){
     this.showLoadingAnimation();
     this.notifications.notify('Navbar.setNavigateBack', false);
   }
 });

 export default NavPage;

</script>

<style lang="sass">
 .wall-page {
   display: flex;
   flex-grow: 1;
   flex-wrap: wrap;

 }
</style>
