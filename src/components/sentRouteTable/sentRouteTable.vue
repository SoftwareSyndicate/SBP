<template>
  <div class="sent-route-table">
    <div class="table-header">
      <div class="left">
        Grade
      </div>
      <div class="right">
        Date Sent
      </div>
    </div>
    <div class="table-body">
      <div class="table-row" v-for="route in routes">
        <div class="left">
          <div class="diamond">
            <div class="diamond-background" v-bind:style="{'background-color': route.actualColor}">

            </div>
            <div class="diamond-grade" v-bind:class="{'tenner': route.grade > 9}">
              <!-- {{route.grade}} -->
            </div>
          </div>
          <!-- <img v-bind:src="'/images/grades/' + tableGradeObject.name + '.png'"> -->
        </div>
        <div class="right">
          {{route.created_at.toLocaleDateString()}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'
 import SentSwitch from '../sentSwitch/sentSwitch.vue'
 var SentRouteTable = BaseComponent.extend({
   name: 'SentRouteTable',
   props: ['routes'],
   components: {
     SentSwitch
   },
   data(){
     return {
       tableData: [],
       colorsArray:['Gray','Yellow','Green','Red','Blue','Orange','Purple','Black'],
       gradesArray:['v0','v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12']
     }
   },
   created(){
     /* this.calculateGradeTotals(this.routes);
        this.filterRoutes(this.routes);

        this.$watch('routes', function (val) {
        console.log("FUCK");
        this.calculateGradeTotals(this.routes);
        this.filterRoutes(this.routes);
        }.bind(this)) */
   },

   methods: {
     calculateGradeTotals(routes){
       routes.forEach(route => {
         route.grade = route.grade;
         route.actualColor = window.colorMappings[route.color];
         route.colorValue = RouteModel.findColorIndex(route.actualColor);
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
     }
   }
 });

 export default SentRouteTable;
</script>

<style lang="scss">

 $header-cell-padding: 1.4em;
 $cell-padding: 1.6em;
 $cell-border: 2px rgba(215, 218, 230, .3) solid;

 .sent-route-table {
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
