<template>
  <ul class="collection with-header z-depth-1 route-list">
    <!-- HEADER -->
    <li class="collection-header route-list-item header-item">
      <p class="grade-header" @click.stop="changeOrder('attributes.grade')" v-if="displayKeys.indexOf('grade') > -1">Grade</p>
      <p class="wall-header" @click.stop="changeOrder('attributes.wall.attributes.name')" v-if="displayKeys.indexOf('wall') > -1">Wall</p>
      <p class="rating-header" @click.stop="changeOrder('attributes.rating')" v-if="displayKeys.indexOf('rating') > -1">Rating</p>
      <p @click.stop="changeOrder('attributes.sends')" v-if="displayKeys.indexOf('sends') > -1">Sends</p>
      <p @click.stop="changeOrder('attributes.sent')" v-if="displayKeys.indexOf('sent') > -1">Sent</p>
    </li>

    <route-list-item v-for="route in routes | orderBy order reverse" track-by="$index" :route="route" :index="$index" :display-keys="displayKeys"></route-list-item>
  </ul>
</template>

<script>
 import RouteListItem from './routeListItem.vue'
 export default {
   name: 'RouteList',
   props: ['routes', 'displayKeys'],
   data(){
     return {
       order: "attributes.grade",
       reverse: -1
     }
   },
   components: {
     RouteListItem
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

<style lang="sass">
 .route-list {
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
