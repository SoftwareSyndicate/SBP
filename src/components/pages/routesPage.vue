<template>
  <div class="routes-page">
    <route-list :routes="routes" :display-keys="routeKeys"></route-list>
  </div>
</template>

<script>
 import RouteModel from '../../models/RouteModel.js';
 import RouteList from '../routeList/routeList.vue'
 import notifications from '../../services/NotificationService.js'
 export default {
   name: 'RoutePage',
   components: {
     RouteList
   },

   data(){
     return {
       routes: [],
       routeKeys: ['grade', 'wall', 'sends']
     }
   },

   created(){
     notifications.notify('Navbar.setHeader', "Routes");
     RouteModel.getRoutes().then(results => {
       this.routes = results;
       notifications.notify('Overlay.setVisible', false);
     });
   },

   beforeDestroy(){
     notifications.notify('Overlay.setVisible', true);
   }

 };
</script>

<style>

</style>
