<template>
  <div class="news-list">

  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'

 var NewsList = BaseComponent.extend({
   name: 'NewsList',
   data(){
     return {

     }
   },
   created(){

   },

   methods: {
     calculateGradeTotals(routes){

     }
   }
 });

 export default NewsList;
</script>

<style lang="sass">
 $cell-padding: 1.4em;
 $cell-border: 2px rgba(215, 218, 230, .5) solid;

 .news-list-table {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   background-color: white;
   color: rgba(0, 0, 0, .5);
 }
</style>
