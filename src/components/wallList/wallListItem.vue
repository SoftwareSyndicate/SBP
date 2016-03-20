<template>
  <li class="collection-item wall-list-item waves-effect" v-link="{name: 'wall', params: {wallId: wall.id}}">
    <div class="left">
      <div class="name-container">
        <h5 class="name">{{wall.attributes.name}}</h5>
      </div>
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

       var colorMappings = {
         gray: "#8a8a8a",
         yellow: "#FDCA48",
         green: "#32B469",
         red: "#EE3E3F",
         blue: "#237FBD",
         orange: "#F06243",
         purple: "#9013FE",
         black: "#14192D"
       }

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
           color: colorMappings[color],
         }
         this.colors.push(colorObj);
       }
     }
   },
 }
</script>

<style lang="sass">
 .wall-list-item {
   padding: 0 0 0 5px !important;
   border-bottom: 10px solid #E5E5E5 !important;
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 90px;

   .left {
     width: 75%;
     margin-right: 15px;

     .name-container {
       border-bottom: 2px dotted #A2A2A2;
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
       margin: 5px 0 0;
       color: #ff5722;
       padding-left: .2em !important;
     }
   }

   .right {
     width: 25%;
     height: 100%;
     display: flex;
     flex-direction: column;

     .color {
       margin-left: auto;
       height: 5px;
       flex: 1 1 auto;
     }
   }

   &:hover {
     background-color: #fafafa;
   }
 }

</style>
