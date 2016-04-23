<template>
  <div class="profile-page">
    profile

  </div>
  <nav-tabs></nav-tabs>
</template>

<script>
 import BaseComponent from '../../components/base/baseComponent.vue'
 import UserModel from '../../models/UserModel.js'
 import NavTabs from '../navTabs/navTabs.vue'
 var ProfilePage =  BaseComponent.extend({
   name: 'ProfilePage',
   components: {
     NavTabs
   },
   data(){
     return {

     }
   },
   created(){

   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "Stats");
     this.notifications.notify('Overlay.setVisible', false);
     this.notifications.notify('GymPage.changeTab', 'none');
   },
   beforeDestroy(){
     window.scrollTo(0, 0);
   }
 });

 export default ProfilePage;
</script>

<style lang="sass">
 .news-page {
   padding: 16px;

   .news-list {
     padding-bottom: 40px;
   }
 }
</style>
