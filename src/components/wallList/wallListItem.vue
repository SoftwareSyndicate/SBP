<template>
  <li class="collection-item wall-list-item waves-effect component" v-link="{name: 'wall', params: {wallId: wall.id}}">
    <div class="left">
      <div class="name-container"">
        <h5 class="name" v-if="!!wall">{{wall.attributes.name}}</h5>
        <h5 class="name" v-if="gym">Gym Last Set</h5>
      </div>
      <span class="spacer"></span>
      <p class="set-date" v-text="wall.attributes.lastSet | dateSet" v-if="!!wall"></p>
      <p class="set-date" v-text="lastSet | dateSet" v-if="gym"></p>
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
   props: ['wall', 'routes', 'gym'],
   data(){
     return {
       colors: [],
       height: 0,
       lastSet: new Date()
     }
   },
   created(){
     if(!!this.wall){
       this.routes = this.wall.attributes.routes;
       this.wall.lastSet = WallModel.getLastSetDate(this.wall.attributes.lastSet);
     }

     this.lastSet = this.routes[0].updatedAt;
     this.routes.forEach(route => {

       if(route.updatedAt > this.lastSet){
         this.lastSet = route.updatedAt;
       }
     });
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
       this.routes.forEach(route => {
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
@import '../../styles/main.scss';

 .wall-list-item {
   padding: 0 0 0 10px !important;
   display: flex;
   background-color: white;
   flex-grow: 1;

   .left {
     display: flex;
     flex-grow: 1;
     flex-direction: column;
     flex-basis: 75%;
     padding-right: 15px;
     width: 75%;

     .name-container {
       padding-top: 1.5em;
       padding-bottom: .3em !important;

       .name {
         font-size: 1.6em;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         font-weight: 100;
         margin: 20px 0px 0px 4px !important;
         color: rgba(96, 98, 127, .9);
       }
     }

     .spacer {
       margin-top: 15px;
       padding-bottom: .8em;
       border-top: 2px solid rgba(0, 0, 0, .1);
       width: 10%;
       margin-left: 6px;
     }

     .set-date {
       font-size: .9em;
       color: #ff5722;
       padding: 0.4em 0 0 0.4em;
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
       height: 20px;
       margin-left: auto;
     }
   }

   &:hover {
     background-color: #fafafa;
   }
 }

</style>
