<template>
  <ul class="collection with-header z-depth-1 route-list">
    <li class="collection-header route-list-item header-item">
      <p>Grade</p>
      <p>Rating</p>
      <p>Sends</p>
    </li>
    <route-list-item v-for="route in routes" :route="route"></route-list-item>
  </ul>
</template>

<script>
 import RouteListItem from './routeListItem.vue'
 export default {
   components: {
     RouteListItem
   },

   name: 'RouteList',
   data(){
     return {
       routes: [
         {
           grade: "orange5",
           set: new Date(),
           sends: 53,
           rating: 3,
           id: 536165
         },
         {
           grade: "blue4",
           set: new Date(),
           sends: 34,
           rating: 4,
           id: 5365314
         },
         {
           grade: "red3",
           set: new Date(),
           sends: 77,
           rating: 5,
           id: 56578
         }
       ],
     }
   },
   created(){

   },
 }
</script>

<style lang="sass">
 .route-list {
   .header-item {
     p {
       margin: 0px;
     }

     &:hover {
       background-color: #fff;
     }
   }
 }
</style>
