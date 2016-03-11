<template>
  <li class="collection-item wall-list-item waves-effect" v-link="{name: 'wall', params: {wallId: wall.id}}">
    <div class="left">
      <div class="name-container">
        <h5 class="name">{{wall.attributes.name}}</h5>
      </div>
      <p class="set-date">Today</p> 
    </div>
    <div class="right">
      <div class="color" v-for="color in colors"></div>
    </div>
  </li>
</template>

<script>
 import WallModel from '../../models/WallModel.js';
 export default {
   name: 'WallListItem',
   props: ['wall'],
   data(){
     return {
       colors: []
     }
   },
   created(){
     this.wall.lastSet = WallModel.getLastSetDate(this.wall.attributes.lastSet);
     this.calcColorPercents();
   },
   methods: {
     calcColorPercents(){
       var colorData = {
         gray: 0,
         yellow: 0,
         green: 0,
         red: 0,
         blue: 0,
         orange: 0,
         purple: 0,
         black: 0
       };
       this.wall.attributes.routes.forEach(route => {
         colorData[route.attributes.color]++;
       });

       var mostFrequentColor;
       var most = 0;
       for(var color in colorData){
         if(colorData[color] > most){
           most = colorData[color];
           mostFrequentColor = color;
         }
       }
       console.log(mostFrequentColor);
       console.log(most);
     }
   },
 }
</script>

<style lang="sass">
 .wall-list-item {
   padding: .2em !important;
   display: flex;
   justify-content: space-between;
   align-items: center;

   .left {
     width: 75%;

     .name-container {
       border-bottom: 1px dotted rgba(0, 0, 0, .15);
       .name {
         font-size: 2.5em;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         text-transform: uppercase;
         font-weight: 100;
         margin: 0;
       }
     }

     .set-date {
       font-size: .9em;
       margin: 0px;
       color: #ff5722;
       padding-left: .2em !important;
     }
   }

   .right {
     width: 25%;
     height: 100%;

     .color {
       background-color: blue;
     }
   }

   &:hover {
     background-color: #fafafa;
   }
 }

</style>
