<template>
  <li class="collection-item wall-list-item waves-effect" v-link="{name: 'wall', params: {wallId: wall.id}}">
    <img :src="'/static/images/grades/blue' + wall.averageGrade + '.png'" alt="" class="averageGrade">
    <h5 class="name">{{wall.name}}</h5>
    <p class="lastSet">{{wall.lastSet}}</p>
  </li>
</template>

<script>
 import WallModel from '../../models/WallModel.js';
 export default {
   name: 'WallListItem',
   props: ['wall'],
   created(){
     this.wall.averageGrade = WallModel.calculateAverageWallGrade(this.wall);
     if(this.wall.lastSet && (typeof this.wall.lastSet.getMonth === "function")){
       console.log(this.wall.lastSet);
       var parsedDate = this.wall.lastSet.getMonth() + "/" +this.wall.lastSet.getDate() + "/" + this.wall.lastSet.getFullYear();
       this.wall.lastSet = parsedDate;
     }
   },
   methods: {

   }
 }
</script>

<style lang="sass">
 .wall-list-item {
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
