<template>
  <div class="news-list">
    <news-list-item :news-item="newsItem" v-for="newsItem in news"></news-list-item>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'
 import NewsListItem from '../../components/newsList/newsListItem.vue'
 var NewsList = BaseComponent.extend({
   name: 'NewsList',
   props: ['news'],
   components: {
     NewsListItem
   },
   data(){
     return {

     }
   },
   created(){
    //  console.log("news list");
   },

   methods: {
     calculateGradeTotals(routes){

     }
   }
 });

 export default NewsList;
</script>

<style lang="scss">
 $cell-padding: 1.4em;
 $cell-border: 2px rgba(215, 218, 230, .5) solid;

 .news-list {
   display: flex;
   flex-direction: column;
   flex-grow: 1;
   color: rgba(0, 0, 0, .5);

   .news-list-item {
     margin-bottom: 16px;
   }
 }
</style>
