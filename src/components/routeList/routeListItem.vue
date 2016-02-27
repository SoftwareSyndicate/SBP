<template>
  <li class="collection-item route-list-item waves-effect" v-link="{name: 'route', params: {routeId: route.id}}" :click="onClick()">
    <img :src="'/static/images/grades/' + route.attributes.gradeImage + '.png'" alt="" class="grade" v-if="displayKeys.indexOf('grade') > -1">
    <p class="wall" v-if="displayKeys.indexOf('wall') > -1">{{route.attributes.wall.attributes.name}}</p>
    <div class="rating">
      <a href="#!" class="secondary-content" v-for="n in 5 - route.rating"><i class="material-icons empty">grade</i></a>
      <a href="#!" class="secondary-content" v-for="n in route.rating"><i class="material-icons">grade</i></a>
    </div>
    <h5 class="name">{{route.sends}}</h5>
  </li>
</template>

<script>
 export default {
   name: 'RouteListItem',
   props: ['route', 'index', 'displayKeys'],
   created(){

   },
   methods: {
     onClick(){
       //console.log(this.route);
     }
   }
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
