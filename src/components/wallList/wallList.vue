<template>
  <ul class="wall-list collection z-depth-1">
    <li class="collection-item wall-list-item header-item">
      <p @click.stop="changeOrder('averageGrade')">Grade</p>
      <p @click.stop="changeOrder('attributes.name')">Name</p>
      <p @click.stop="changeOrder('attributes.lastSet')">Last Set</p>
    </li>
    <wall-list-item v-for="wall in walls | orderBy order reverse" track-by="$index" :wall="wall"></wall-list-item>
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
   .header-item {
     p {
       margin: 0px;
       cursor: pointer;

       &:hover {
         color: blue;
       }
     }

     &:hover {
       background-color: #fff;
     }
   }
 }
</style>
