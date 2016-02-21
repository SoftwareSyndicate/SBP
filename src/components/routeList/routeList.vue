<template id="wall-list-template">
  <ul class="collection z-depth-1">
    <wall-list-item v-for="wall in walls" :wall="wall"></wall-list-item>
  </ul>
</template>

<script>
 import WallListItem from './wallListItem.vue'
 export default {
   components: {
     WallListItem
   },

   name: 'WallList',
   data(){
     return {
       walls: [
         {
           name: "FS1",
           averageGrade: "orange5",
           lastSet: new Date()
         },
         {
           name: "Roof",
           averageGrade: "blue4",
           lastSet: new Date()
         },
         {
           name: "East Wall",
           averageGrade: "red3",
           lastSet: new Date()
         }
       ],
     }
   },
   created(){

   },
 }
</script>

<style lang="sass">
 #wall-list-temalpate {
   
 }
</style>
