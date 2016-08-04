<template>
  <ul class="wall-list collection">
    <wall-list-item v-for="wall in walls | orderBy 'last_set' -1" track-by="$index" :wall="wall"></wall-list-item>
  </ul>
</template>

<script>
 import WallListItem from './wallListItem.vue'
 export default {
   components: {
     WallListItem
   },
   name: 'WallList',
   props: {
     walls: {
       type: Array,
       default: () => []
     }
   },
   data(){
     return {
       order: "last_set",
       reverse: -1
     }
   },
   created(){

   },
   methods: {
     changeOrder(order){
       this.order = order;
       this.reverse = this.reverse * -1;
     }
   }
 }
</script>

<style lang="scss">
 .wall-list {
   margin: 0px;
   border: none !important;
   box-shadow: none !important;

   .wall-list-item {
     margin-bottom: 1em;
   }
 }
</style>
