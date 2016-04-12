<template>
  <div class="news-page">

  </div>
</template>
<script>
 import WallModel from '../../models/WallModel.js'
 import RouteModel from '../../models/RouteModel.js'

 var NewsPage = BaseComponent.extend({
   name: 'NewsPage',
   data(){
     return {

     }
   },
   components: {

   },
   created(){
     this.notifications.notify('Navbar.setHeader', "News");
   },
   ready(){

   },
   methods: {
     getNews(){

     }
   }
 });

 export default GymLayoutPage
</script>

<style lang="sass">
 @import '../../styles/main.scss';

 .news-page {
   display: flex;
   flex-wrap: wrap;


 }
</style>
