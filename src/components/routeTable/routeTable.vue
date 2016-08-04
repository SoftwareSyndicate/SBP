<template>
  <div class="route-table">
    <div class="table-header">
      <div class="header-item route-id-header" @click="sort('id')" :class="{'active': sortBy == 'id'}">
        #
      </div>
      <div class="header-item grade-header" @click="sort('grade')" :class="{'active': sortBy == 'grade'}">
        Grade
      </div>
      <div class="header-item sent-header" @click="sort('sent')" :class="{'active': sortBy == 'sent'}">
        Sent
      </div>
    </div>
    <div class="table-body">
      <div class="table-row" v-for="route in routes">
        <div class="row-item route-id">
          {{$index + 1}}
        </div>
        <div class="row-item grade">
          <div class="diamond">
            <div class="diamond-background" v-bind:style="{'background-color': route.htmlColor}">

            </div>
            <div class="diamond-grade" v-bind:class="{'tenner': route.grade > 9}">
              <!-- {{route.grade}} -->
            </div>
          </div>
        </div>
        <div class="row-item sent">
          <sent-switch :route.sync="route">
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
       gradesArray:['v0','v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12'],
       sortBy: "grade"
     }
   },
   created(){

   },

   beforeDestroy(){

   },

   methods: {
     sort(sortBy){
       if(this.sortBy === sortBy){
         this.routes = this.routes.reverse();
       } else {
         this.sortBy = sortBy;
         if(sortBy == "id"){
           /* this.routes = this.sortByNumber(this.routes); // TODO ROUTES NEED NUMBERS */
         } else if(sortBy == "grade"){
           this.routes = this.sortByGrade(this.routes);
         } else if(sortBy == "sent"){
           /* this.routes = this.sortBySent(this.routes); // TODO ROUTES NEED NUMBERS */
         }
       }
     },

     sortByNumber(routes){
       routes.sort(function(a, b) {
         if(a.number > b.number){
           return 1;
         } else if(a.number < b.number){
           return -1;
         } else {
           return 0;
         }
       });
     },

     sortBySent(routes){
       routes.sort(function(a, b) {
         if(a.sent && !b.sent){
           return 1;
         } else if(!a.sent && b.sent){
           return -1;
         } else {
           return 0;
         }
       });
     },


     sortByGrade(routes){
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

 export default RouteTable;
</script>

<style lang="scss">
 @import '../../styles/main.scss';
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

     .header-item {
       border-right: $cell-border;
       padding: $header-cell-padding;
       cursor: pointer;

       &.active {
         color: $color-base-orange;
       }

       &:last-child {
         border-right: none;
       }
     }

     .route-id-header {
       flex-basis: 20%;
     }

     .grade-header {
       flex-basis: 40%;
     }

     .sent-header {
       flex-basis: 40%;
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

       .row-item {
         display: flex;
         align-items: center;
         padding: $header-cell-padding;
         border-right: $cell-border;

         &:last-child {
           border: none;
         }
       }

       .route-id {
         flex-basis: 20%;
       }

       .grade {
         flex-basis: 40%;
       }

       .sent {
         flex-basis: 40%;
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
