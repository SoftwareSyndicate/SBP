<template>
  <div class="route-rating">
    <a class="secondary-content" v-for="n in 5 - route.attributes.rating"><i class="material-icons empty"  v-on="mouseover: change" :click="rate">grade</i></a>
    <a class="secondary-content" v-for="n in route.attributes.rating"><i class="material-icons" :click="rate">grade </i></a>
  </div>
</template>

<script>
 import RouteModel from '../../models/RouteModel.js'
 export default {
   el: ".route-rating",
   name: 'RouteRating',
   props: ['route'],
   created(){
     console.log($(".material-icons"));
   },

   ready(){
     console.log("routeRating.attached()");
     console.log(this.$el.children);

     $(this.$el).hover(function(){
       console.log("me##################h");
     });
   },

   methods: {
     rate(){
       console.log("routeRating.rate()");
     },

     change(){
       console.log("change");
     }
   }
 }
</script>

<style lang="sass">
 .route-rating {

   i {
     cursor: pointer;
     &:hover {
       color: #26a69a !important;
     }
   }

   i.empty {
     color: #e0e0e0;
   }
 }
</style>
