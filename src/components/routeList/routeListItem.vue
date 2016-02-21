<template>
  <li class="collection-item route-list-item waves-effect">
    <img :src="'/static/images/grades/' + route.averageGrade + '.png'" alt="" class="averageGrade">
    <h5 class="name">{{route.name}}</h5>
    <div class="rating">
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </div>
  </li>
</template>

<script>
 export default {
   name: 'RouteListItem',
   props: ['route'],
   created(){
     console.log("routeListItem.created()");
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

   .averageGrade {
     width: 3em;
     height: 3em;
   }
 }

</style>
