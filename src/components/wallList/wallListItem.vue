<template>
  <li class="collection-item wall-list-item waves-effect" v-link="{name: 'wall', params: {wallId: wall.id}}">
    <img :src="'/static/images/grades/' + wall.gradeImage + '.png'" alt="" class="averageGrade">
    <h5 class="name">{{wall.attributes.name}}</h5>
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
     this.wall.lastSet = WallModel.getLastSetDate(this.wall.attributes.lastSet);
     this.wall.gradeImage = WallModel.getGradeImage(this.wall.averageGrade);
   },
   methods: {

   },
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

   .name {
     font-size: 1.1em;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
     padding: 0 .5em 0 .5em;
   }

   .lastSet {
     font-size: .9em;
   }
 }

</style>
