<template>
  <div class="route-page">
    <div class="grade-image-container">
      <img :src="'/static/images/grades/' + route.attributes.gradeImage + '.png'" alt="" class="grade">
    </div>

  </div>
</template>

<script>
 import RouteModel from '../../models/RouteModel.js';
 export default {
   name: 'Route Page',
   data(){
     return {
       route: {}
     }
   },

   created(){
     var routeId = window.location.href.split("/")[window.location.href.split("/").length - 1];
     RouteModel.getRouteById(routeId).then(results => {
       this.route = results;
     });
   },

   components: {

   }
 };
</script>

<style lang="sass">
 .route-page {
   .grade-image-container {
     padding: 16px;
     display: flex;
     justify-content: center;

     img {
       height: 10em;
       width: 10em;
     }
   }
 }

</style>
