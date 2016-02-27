<template>
  <div class="walls-page">
    <route-list></route-list>
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

   created(){
     RouteModel.getRoutes().then(results => {
       this.routes = results;
       console.log(this.routes);
     });
   },

 };
</script>

<style>

</style>
