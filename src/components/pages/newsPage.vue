<template>
  <div class="news-page">
    <news-list :news="news"></news-list>
  </div>
</template>

<script>
import BaseComponent from '../../components/base/baseComponent.vue'
import UserModel from '../../RMS/src/models/UserModel.js'
import NewsList from '../../components/newsList/newsList.vue'
import NotificationModel from 'rms-models/NotificationModel'


var NewsPage =  BaseComponent.extend({
  name: 'NewsPage',
  components: {
    NewsList
  },
  data(){
    return {
      news: {}
    }
  },
  created(){
    NotificationModel.getNotifications();
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
    onNotificationsUpdated(e, notifs){
      this.news = notifs;
    }
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
