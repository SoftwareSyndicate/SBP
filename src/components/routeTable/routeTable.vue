<template>
  <div class="route-table">
    <div class="table-header">
      <div class="left">
        Grade
      </div>
      <div class="right">
        Amount
      </div>
    </div>
    <div class="table-body">
      <div class="table-row" v-for="tableGradeObject in tableData | gradeFilter | orderBy 'color'">
        <div class="left">
          <div class="diamond">
            <div class="diamond-background z-depth-1" v-bind:style="{'background-color': tableGradeObject.color}">

            </div>
            <div class="diamond-grade" v-bind:class="{'tenner': tableGradeObject.grade > 9}">
              {{tableGradeObject.grade}}
            </div>
          </div>
          <!-- <img v-bind:src="'/images/grades/' + tableGradeObject.name + '.png'"> -->
        </div>
        <div class="right">
          {{tableGradeObject.total}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'

 var RouteTable = BaseComponent.extend({
   name: 'RouteTable',
   props: ['routes', 'displayKeys'],
   data(){
     return {
       tableData: [],
       colorsArray:['Gray','Yellow','Green','Red','Blue','Orange','Purple','Black'],
       gradesArray:['v0','v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12']
     }
   },
   created(){
     console.log(this.routes.length);
     this.calculateGradeTotals(this.routes);
   },

   methods: {
     calculateGradeTotals(routes){
       var tableData = [];
       routes.forEach(route => {
         var vGrade = route.attributes.color + route.attributes.grade;
         var found = false;
         tableData.forEach(tableGradeObject => {
           if(tableGradeObject.name === vGrade){
             tableGradeObject.total++;
             found = true;
           }
         });
         if(!found){
           console.log("NEW TABLE GRADE OBJECT");
           var tableGradeObject = {
             name: vGrade,
             total: 1,
             color: window.colorMappings[route.attributes.color],
             grade: route.attributes.grade
           };
           tableData.push(tableGradeObject);
         }
       });
       this.tableData = tableData;
     }
   }
 });

 export default RouteTable;
</script>

<style lang="sass">

 $cell-padding: 1.4em;
 $cell-border: 2px rgba(215, 218, 230, .5) solid;

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
       padding: $cell-padding;
       border-right: $cell-border;
     }

     .right {
       flex-basis: 50%;
       padding: $cell-padding;
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
