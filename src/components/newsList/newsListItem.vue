<template>
  <div class="news-list-item">
    <div class="set-news-item">
      <div class="header">
        <img src="~images/sbp_stamp.png">
        <p class="author">{{author.first_name}} {{author.last_name}}</p>
        <p class="time">{{newsItem.created_at | dateSet}}</p>
      </div>
      <div class="content">
        <p class="message">{{newsItem.text}}</p>
        <wall-list-item v-if="wall" :wall="wall"></wall-list-item>
        <a class="waves-effect waves-dark btn btn-primary" v-link="newsItem.link">View Wall</a>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '../base/baseComponent.vue'
import WallListItem from 'components/wallList/wallListItem'
import UserModel from 'rms-models/UserModel'
import WallModel from 'models/WallModel'
import RouteModel from 'models/RouteModel'

var NewsListItem = BaseComponent.extend({
  name: 'NewsListItem',
  props: ['newsItem'],
  components: {
    WallListItem
  },
  data(){
    return {
      author: {},
      wall: null
    }
  },
  created(){
    UserModel.getUserById(this.newsItem.author_id).then((data)=>{
      this.author = data.val();
    })
    if(this.newsItem.wall_id){
      let w = WallModel._walls.child(this.newsItem.wall_id).val();
      w.routes = RouteModel._routesByWall[this.newsItem.wall_id];
      this.wall = w;
    }
  },
  notifs(){
    return {

    }
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
        margin-left: 1em;
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
        margin-top: 10px;
      }
    }
  }

}
</style>
