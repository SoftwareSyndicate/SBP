<template>
  <div class="news-list-item">
    <div class="set-news-item">
      <div class="header">
        <img src="../../../images/sbp_stamp.png">
        <p class="author">{{newsItem.author.username}}</p>
        <p class="time">{{newsItem.createdAt | dateSet}}</p>
      </div>
      <div class="content">
        <p class="message">{{newsItem.message}}</p>
        <a class="waves-effect waves-dark btn btn-primary" v-link="newsItem.link">View Wall</a>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'

 var NewsListItem = BaseComponent.extend({
   name: 'NewsListItem',
   props: ['newsItem'],
   data(){
     return {

     }
   },
   created(){
     /* console.log(this.newsItem); */
   },
   methods: {
     calcColorPercents(){

     }
   },
 });

 export default NewsListItem;
</script>

<style lang="sass">
 @import '../../styles/main.scss';

 .news-list-item {
   display: flex;
   flex-grow: 1;
   background-color: white;

   .set-news-item {
     display: flex;
     flex-grow: 1;
     flex-direction: column;

     .header {
       display: flex;
       flex-grow: 1;
       align-items: center;
       padding: 1em;
       border-bottom: $component-border;
       img {
         height: 3em;
         width: 3em;
       }
       p.author {

       }

       p.time {
         margin-left: auto !important;
       }
     }
     .content {
       display: flex;
       flex-grow: 1;
       flex-direction: column;
       padding: 1em;
       border-bottom: $component-border;

       .message {
         margin-bottom: 1em !important;
       }

       .btn {
         margin: auto;
       }
     }
   }

 }
</style>
