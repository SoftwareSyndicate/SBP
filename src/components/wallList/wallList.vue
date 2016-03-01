<template>
  <ul class="wall-list collection z-depth-1">
    <li class="collection-item wall-list-item header-item">
      <p>Grade</p>
      <p>Name</p>
      <p>Last Set</p>
    </li>
    <wall-list-item v-for="wall in walls" track-by="$index" :wall="wall"></wall-list-item>
  </ul>
</template>

<script>
 import WallListItem from './wallListItem.vue'
 export default {
   components: {
     WallListItem
   },

   name: 'WallList',
   props: ['walls'],
   created(){
     
   },
 }
</script>

<style lang="sass">
 .wall-list {
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
