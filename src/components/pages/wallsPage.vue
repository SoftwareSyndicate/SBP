<template>
  <div class="walls-page">
    <wall-list></wall-list>
  </div>
</template>

<script>
 import WallList from '../wallList/wallList.vue'
 import notifications from '../../services/NotificationService.js'
 export default {
   name: 'WallsPage',

   components: {
     WallList
   },

   created(){
     notifications.notify('Navbar.setHeader', "Walls");
     notifications.notify('Overlay.setVisible', false);
   },

   beforeDestroy(){
     notifications.notify('Overlay.setVisible', true);
   }

 };
</script>

<style>

</style>
