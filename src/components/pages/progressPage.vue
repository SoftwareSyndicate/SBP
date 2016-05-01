<template>
  <div class="progress-page">
    progress page
  </div>
  <nav-tabs></nav-tabs>
</template>
<script>
 import BaseComponent from '../../components/base/baseComponent.vue'
 import UserModel from '../../models/UserModel.js'
 import RouteModel from '../../models/RouteModel.js'
 import NavTabs from '../navTabs/navTabs.vue'
 var ProgressPage =  BaseComponent.extend({
   name: 'ProgressPage',
   components: {
     NavTabs
   },
   data(){
     return {
       currentUser: UserModel.currentUser,
       sentRoutes: RouteModel.sentRoutes,
       averageMonthly: 20,
       totalSent: 356,
       averageGrade: "v5"
     }
   },
   created(){
     console.log(this.currentUser);
     console.log(this.sentRoutes);
     console.log(this.averageMonthly);
     console.log(this.totalSent);
     console.log(this.averageGrade);
   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "MY PROGRESS");
     this.notifications.notify('Overlay.setVisible', false);
     this.notifications.notify('GymPage.changeTab', 'none');
     this.notifications.notify('NavTabs.setActiveTab', 'profile');
   },
   beforeDestroy(){
     window.scrollTo(0, 0);
   }
 });

 export default ProgressPage;
</script>

<style lang="sass">
 @import "../../styles/main.scss";
 .progress-page {


 }
</style>
