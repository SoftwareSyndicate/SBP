<template>
  <div class="news-page">
    <!-- <news-list :news="news"></news-list> -->
    <notification-list :notifs="notifs"></notification-list>
  </div>
</template>

<script>
 import BaseComponent from '../../components/base/baseComponent.vue'
 import UserModel from '../../RMS/src/models/UserModel.js'
 import NotificationList from 'components/notificationList/notificationList'

 import NotificationModel from 'rms-models/NotificationModel'

 var NewsPage =  BaseComponent.extend({
   name: 'NewsPage',
   components: {
     NotificationList
   },
   data(){
     return {
       notifs: []
     }
   },
   created(){
     this.notifs = NotificationModel.notifications;
   },
   notifs(){
     return {
       'NotificationModel.notificationsUpdated': 'onNotificationsUpdated'
     }
   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "News");
   },
   beforeDestroy(){
     window.scrollTo(0, 0);
   },
   methods: {
     onNotificationsUpdated(e){
       this.notifs = NotificationModel.notifications;
     }
   }
 });

 export default NewsPage;
</script>

<style lang="scss">
 .news-page {
   padding: 16px;

   .notification-list {
     padding-bottom: 40px;
   }
 }
</style>
