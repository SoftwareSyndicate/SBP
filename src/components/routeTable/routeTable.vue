<template>
  <div class="route-table">
    <div class="table-header">
      <div class="left">
        Grade
      </div>
      <div class="right">
        Sent
      </div>
    </div>
    <div class="table-body">
      <div class="table-row" v-for="route in routes">
        <div class="left">
          <div class="diamond">
            <div class="diamond-background" v-bind:style="{'background-color': route.htmlColor}">

            </div>
            <div class="diamond-grade" v-bind:class="{'tenner': route.grade > 9}">
              {{route.grade}}
            </div>
          </div>
        </div>
        <div class="right">
          <sent-switch :route="route" :toggle="toggleRouteSent">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from '../../RMS/src/components/base/baseComponent.vue'
 import SentSwitch from '../sentSwitch/sentSwitch.vue'
 var RouteTable = BaseComponent.extend({
   name: 'RouteTable',
   props: {
     routes: {
       type: Array,
       default: () => []
     }
   },
   components: {
     SentSwitch
   },
   data(){
     return {
       colorsArray:['Gray','Yellow','Green','Red','Blue','Orange','Purple','Black'],
       gradesArray:['v0','v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12']
     }
   },
   created(){
     this.$watch('routes', val => {
       this.calculateGradeTotals(this.routes);
       this.filterRoutes(this.routes);
     }, {
       immediate: true
     });
   },

   beforeDestroy(){

   },

   methods: {
     calculateGradeTotals(routes){
       //Filter Routes before displaying them, don't use filter - performance issues
       routes.forEach(route => {
         route.grade = route.grade;
         route.actualColor = window.colorMappings[route.color];
         route.colorValue = this.findColorIndex(route.actualColor);
       });
     },
     filterRoutes(routes){
       routes.sort(function(a, b) {
         if(a.grade > b.grade){
           return 1;
         } else if(a.grade < b.grade) {
           return -1;
         } else {
           return 0;
         }
       });

       routes.sort(function(a, b){
         if(a.colorValue > b.colorValue){
           return 1;
         } else if(a.colorValue < b.colorValue){
           return -1;
         } else {
           return 0;
         }
       });
       routes.reverse();
       return routes;
     },

     findColorIndex(color){
       var value;
       switch(color){
         case "rgba(209,209,209, 0.8)":
           value = 0;
           break;
         case "rgba(255,210,28, 0.8)":
           value = 1;
           break;
         case "rgba(5,179,99, 0.9)":
           value = 2;
           break;
         case "rgba(243,23,38, 0.8)":
           value = 3;
           break;
         case "rgba(48,99,245, 0.8)":
           value = 4;
           break;
         case "rgba(252,109,33, 0.8)":
           value = 5;
           break;
         case "rgba(183,22,229,0.8)":
           value = 6;
           break;
         case "rgba(33,33,33,0.9)":
           value = 7;
           break;
       }
       return value;
     },

     toggleRouteSent(route){
       console.log("toggle fo");
       console.log(route);
       route.sent = !route.sent;
     }
   }
 });

 export default RouteTable;
</script>

<style lang="sass">

 $header-cell-padding: 1.4em;
 $cell-padding: 1.6em;
 $cell-border: 2px rgba(215, 218, 230, .3) solid;

 .route-table {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   background-color: white;
   color: rgba(0, 0, 0, .5);

   .table-header {
     display: flex;
     flex-grow: 1;
     flex-basis: 100%;
     font-weight: bold;
     border-bottom: $cell-border;
     .left {
       flex-basis: 50%;
       padding: $header-cell-padding;
       border-right: $cell-border;
     }

     .right {
       flex-basis: 50%;
       padding: $header-cell-padding;
     }
   }

   .table-body {
     display: flex;
     flex-wrap: wrap;
     flex-grow: 1;
     flex-basis: 100%;
     font-weight: bold;

     img {
       width: 3em;
       height: 3em;
     }

     .table-row {
       display: flex;
       flex-grow: 1;
       flex-basis: 100%;
       border-bottom: $cell-border;

       &:last-child {
         border: none;
       }

       .left {
         align-items: center;
         display: flex;
         flex-basis: 50%;
         padding: 0;
         padding-left: $cell-padding;
         border-right: $cell-border;
       }

       .right {
         display: flex;
         flex-basis: 50%;
         padding: $cell-padding;
       }
     }
   }

   .diamond {
     position: relative;
     .diamond-background {
       position: absolute;
       width: 2em;
       height: 2em;
       transform: rotate(45deg);
       transform-origin: 0 100%;
       background-color: red;
       top: -2em;
     }

     .diamond-grade {
       font-weight: normal;
       font-size: .9em;
       color: white;
       position: absolute;
       top: -.72em;
       right: -1.88em;

     }

     .tenner {
       right: -2.12em;
     }
   }
 }
</style>
