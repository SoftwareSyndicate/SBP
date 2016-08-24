<template>
  <li class="collection-item wall-list-item waves-effect component" v-link="{name: 'wall', params: {id: wall.id}}">
    <div class="left">
      <div class="name-container">
        <h5 class="name" v-if="wall">{{wall.name}}</h5>
      </div>
      <span class="spacer"></span>
      <p class="set-date" v-text="wall.last_set | dateSet"></p>
    </div>
    <div class="right">
      <div class="color-container">
        <div class="color" v-for="color in colors" v-bind:style="{'background-color': color.color, 'width': color.percent}">&nbsp</div>
      </div>
    </div>
  </li>
</template>

<script>
 export default {
   name: 'WallListItem',
   props: {
     wall: {
       type: Object,
       default: () => {}
     }
   },
   data(){
     return {
       colors: [],
       height: 0
     }
   },
   created(){
     this.$watch('wall', val => {
       if(this.wall.routes){
         this.colors = [];
         this.calcColorPercents();
       }
     }, {
       deep: true,
       immediate: true
     });
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
       this.wall.routes.forEach(route => {
         colorData[route.color]++;
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

<style lang="scss">

 .wall-list-item {
   padding: 0 0 0 10px !important;
   display: flex;
   background-color: white;
   flex-grow: 1;

   .left {
     display: flex;
     flex-grow: 1;
     flex-wrap: wrap;
     flex-basis: 75%;
     padding-right: 15px;
     width: 75%;

     .name-container {
       flex-basis: 100%;
       padding-top: 1.5em;
       padding-bottom: .3em !important;
       margin: 20px 0px 0px 4px !important;

       .name {
         font-size: 1.6em;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         font-weight: 300;

         color: rgba(96, 98, 127, .8);
       }
     }

     .spacer {
       border-top: 2px solid rgba(0, 0, 0, .1);
       width: 10%;
       margin-left: 6px;
     }

     .set-date {
       flex-basis: 100%;
       font-size: .9em;
       color: #FF7055;
       padding: 0.4em 0 0 0.4em;
     }
   }

   .right {
     display: flex;
     flex-grow: 1;
     flex-basis: 25%;
     flex-wrap: wrap;
     width: 25%;

     .color-container {
       flex-basis: 100%;

       .color {
         display: flex;
         height: 20px;
         margin-left: auto;
       }
     }
   }

   &:hover {
     background-color: #fafafa;
   }
 }

</style>
