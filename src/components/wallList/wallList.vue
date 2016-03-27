<template>
  <ul class="wall-list collection">
    <wall-list-item v-for="wall in walls | orderBy 'attributes.lastSet' -1" track-by="$index" :wall="wall"></wall-list-item>
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
   data(){
     return {
       order: "attributes.lastSet",
       reverse: -1
     }
   },
   created(){

   },
   methods: {
     changeOrder(order){
       console.log(this.walls);
       this.order = order;
       this.reverse = this.reverse * -1;
     }
   }
 }
</script>

<style lang="sass">
 .wall-list {
   margin: 0px;
   border: none !important;
   box-shadow: none !important;

   .wall-list-item {
     margin-bottom: 1em;
   }
 }
</style>
