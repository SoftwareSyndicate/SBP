<template>
  <li class="collection-item wall-list-item waves-effect" v-link="{name: 'wall', params: {wallId: wall.id}}">
    <div class="left">
      <div class="name-container">
        <h5 class="name">{{wall.attributes.name}}</h5>
      </div>
      <span class="spacer"></span>
      <p class="set-date" v-text="wall.attributes.lastSet | dateSet"></p>
    </div>
    <div class="right">
      <div class="color" v-for="color in colors" v-bind:style="{'background-color': color.color, 'width': color.percent}">&nbsp</div>
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
       colors: [],
       height: 0
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
       var totalColors = 0;
       for(var color in colorData){
         if(colorData[color] > most){
           most = colorData[color];
           mostFrequentColor = color;
         }
         totalColors++;
       }
       this.height = 100 / totalColors;
       var percentMultiplier = 100 / most;
       for(var color in colorData){
         var colorObj = {
           percent: (percentMultiplier * colorData[color]) + "%",
           color: window.colorMappings[color],
         }
         this.colors.push(colorObj);
       }
     }
   },
 }
</script>

<style lang="sass">
 .wall-list-item {
   padding: 0 0 0 10px !important;
   //border-bottom: 2px solid #E5E5E5 !important;
   display: flex;

   .left {
     display: flex;
     flex-grow: 1;
     flex-direction: column;
     flex-basis: 75%;
     padding-right: 15px;
     width: 75%;

     .name-container {
       padding-top: 1.5em;
       padding-bottom: 1em;

       .name {
         font-size: 2em;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         text-transform: uppercase;
         font-weight: 100;
         margin: 0;
         color: rgba(0, 0, 0, .5);
       }
     }

     .spacer {
       padding-bottom: .8em;
       border-top: 2px solid rgba(0, 0, 0, .1);
       width: 10%;
     }

     .set-date {
       font-size: .9em;
       margin: 5px 0 0;
       color: #ff5722;
       padding-left: .2em !important;
     }
   }

   .right {
     display: flex;
     flex-grow: 1;
     flex-basis: 25%;
     flex-direction: column;
     width: 25%;

     .color {
       display: flex;
       height: 15px;
       margin-left: auto;
     }
   }

   &:hover {
     background-color: #fafafa;
   }
 }

</style>
