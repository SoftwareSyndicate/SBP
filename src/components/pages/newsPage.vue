<template>
  <div class="news-page">
    <news-list :news="news"></news-list>
  </div>
</template>

<script>
 import BaseComponent from '../../components/base/baseComponent.vue'
 import UserModel from '../../models/UserModel.js'
 import NewsList from '../../components/newsList/newsList.vue'
 var NewsPage =  BaseComponent.extend({
   name: 'NewsPage',
   components: {
     NewsList
   },
   data(){
     return {
       news: [
         {
           createdAt: new Date(),
           attributes: {
             author: UserModel.currentUser,
             message: "Hi SBP Community, set just recently set new routes on F.S.1!",
             type: "set",
             wallName: "F.S.1",
             link: "/gym/walls/gMPIL8A8v1"
           }
         },
         {
           createdAt: new Date(),
           attributes: {
             author: UserModel.currentUser,
             message: "Hi SBP Community, set just recently set new routes on F.S.1!",
             type: "set",
             wallName: "F.S.1",
             link: "/gym/walls/gMPIL8A8v1"
           }
         }
       ]
     }
   },
   created(){

   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "News");
     this.notifications.notify('Overlay.setVisible', false);
     this.notifications.notify('GymPage.changeTab', 'news');
   },
   beforeDestroy(){
     window.scrollTo(0, 0);
   }
 });

 export default NewsPage;
</script>

<style lang="sass">
 .news-page {
   padding: 16px;

   .news-list {
     padding-bottom: 40px;
   }
 }
</style>
