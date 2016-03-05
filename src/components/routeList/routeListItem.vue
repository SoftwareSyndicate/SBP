<template>
  <li class="collection-item route-list-item waves-effect" v-link="{name: 'route', params: {routeId: route.id}}" :click="onClick()">
    <img :src="'/static/images/grades/' + route.attributes.gradeImage + '.png'" alt="" class="grade" v-if="displayKeys.indexOf('grade') > -1">
    <p class="wall" v-if="displayKeys.indexOf('wall') > -1">{{route.attributes.wall.attributes.name}}</p>
    <div class="rating" v-if="displayKeys.indexOf('rating') > -1">
      <a href="#!" class="secondary-content" v-for="n in 5 - route.rating"><i class="material-icons empty">grade</i></a>
      <a href="#!" class="secondary-content" v-for="n in route.rating"><i class="material-icons">grade</i></a>
    </div>
    <!-- <h5 class="name" v-if="displayKeys.indexOf('sends') > -1">{{route.attributes.sends}}</h5> -->
    <h5 class="name" v-if="displayKeys.indexOf('sends') > -1">{{555 - index}}</h5>
    <sent-switch :route="route" v-if="displayKeys.indexOf('sent') > -1"></sent-switch>
    <!-- <p class="wall" v-if="displayKeys.indexOf('sent') > -1">{{route.attributes.sent}}5</p> -->
  </li>
</template>

<script>
 import SentSwitch from '../sentSwitch/sentSwitch.vue'
 export default {
   name: 'RouteListItem',
   props: ['route', 'index', 'displayKeys'],
   components: {
     SentSwitch
   },
   created(){

   },
   methods: {
     onClick(){
       //console.log(this.route);
     }
   },
 }
</script>

<style lang="sass">
 .route-list-item {
   line-height: 1em;
   display: flex;
   justify-content: space-between;
   align-items: center;

   &:hover {
     background-color: #fafafa;
   }

   .grade {
     width: 2.5em;
     height: 2.5em;
   }

   .rating {
     i.empty {
       color: #e0e0e0;
     }
   }
 }

</style>
