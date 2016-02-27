<template>
  <div class="walls-page">
    <route-list :routes="routes" :display-keys="routeKeys"></route-list>
  </div>
</template>

<script>
 import RouteModel from '../../models/RouteModel.js';
 import RouteList from '../routeList/routeList.vue'
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
     RouteModel.getRoutes().then(results => {
       this.routes = results;
       console.log(results);
     });
   },

 };
</script>

<style>

</style>
