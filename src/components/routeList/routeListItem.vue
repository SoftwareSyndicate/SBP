<template>
  <li class="collection-item route-list-item waves-effect" v-link="{name: 'route', params: {routeId: route.id}}">
    <img :src="'/static/images/grades/' + route.grade + '.png'" alt="" class="grade">
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
   props: ['route'],
   created(){
     
   },
   methods: {

   }
 }
</script>

<style lang="sass">
 .route-list-item {
   display: flex;
   justify-content: space-between;
   align-items: center;

   &:hover {
     background-color: #fafafa;
   }

   .grade {
     width: 3em;
     height: 3em;
   }

   .rating {
     i.empty {
       color: #e0e0e0;
     }
   }
 }

</style>
