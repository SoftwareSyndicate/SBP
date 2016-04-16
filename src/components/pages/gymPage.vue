<template>
  <div class="gym-page">
    <ul class="tabs z-depth-1" v-show="tabsVisible">
      <li class="tab col s3 z-depth-1" v-bind:class="{'active': wallsTabVisible}" @click="changeTab('walls')" v-link="{name: 'walls'}">
        <p class="tab-name">Walls</p>
        <a href="#tab-walls" class="">
          <i class="material-icons">dns</i>
        </a>
      </li>
      <li class="tab col s3 z-depth-1" v-bind:class="{'active': layoutTabVisible}" @click="changeTab('layout')" v-link="{name: 'layout'}">
        <p class="tab-name">Layout</p>
        <a href="#tab-layout" class="">
          <i class="material-icons">equalizer</i>
        </a>
      </li>
      <li class="tab col s3 z-depth-1" v-bind:class="{'active': newsTabVisible}" @click="changeTab('news')" v-link="{name: 'news'}">
        <p class="tab-name">News</p>
        <a href="#tab-news" class="">
          <i class="material-icons">web</i>
        </a>
      </li>
    </ul>

    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'
 var GymPage = BaseComponent.extend({
   name: 'GymPage',
   data(){
     return {
       wallsTabVisible: true,
       newsTabVisible: false,
       layoutTabVisible: false,
       tabsVisible: true
     }
   },
   created(){
     this.notifications.listenFor('GymPage.setTabsVisible', this.setTabsVisible, this);
     this.notifications.listenFor('GymPage.setActiveTab', this.changeTab, this);
     this.notifications.notify('Navbar.setHeader', "seattle bouldering project");
     this.notifications.notify('Navbar.setActiveTab', "gym");
     this.changeTab(this.$route.name);
   },
   ready(){
     $('ul.tabs').tabs();
   },
   methods: {
     changeTab(tab){
       if(tab === "layout"){
         this.layoutTabVisible = true;
         this.wallsTabVisible = false;
         this.newsTabVisible = false;
       } else if(tab === "walls"){
         this.layoutTabVisible = false;
         this.wallsTabVisible = true;
         this.newsTabVisible = false;
       } else if(tab === "news"){
         this.layoutTabVisible = false;
         this.wallsTabVisible = false;
         this.newsTabVisible = true;
       } else {
         this.layoutTabVisible = false;
         this.wallsTabVisible = false;
         this.newsTabVisible = false;
       }
     },
     setTabsVisible(e, visible){
       this.tabsVisible = visible;
     }
   },

   beforeDestroy(){
     this.showLoadingAnimation();
     window.scrollTo(0, 0);
   }
 });

 export default GymPage
</script>

<style lang="sass">
 .gym-page {
   .tabs {
     height: 50px;
     position: fixed;
     z-index: 2;
     top: calc(100vh - 50px);
     li.tab {
       position: relative;
       float: none;

       .tab-name {
         position: absolute;
         width: 100%;
         top: 25%;
         font-size: .6em;
         text-align: center;
         font-weight: bold;
         color: rgba(0, 0, 0, .3);
       }

       i {
         color: rgba(0, 0, 0, .3);
       }

       &.active {
         box-shadow: none;

         .tab-name {
           color: black
         }
         i {
           color: black;
         }
       }
     }
   }

   .content-wrapper {
     width: 100%;
   }

   .stamp-container {
     display: flex;
     margin-top: 4em;
     padding-top: 4em;
     margin-bottom: 4em;

     img.sbpStamp {
       margin-left: auto;
       margin-right: auto;
       height: 13em;
     }
   }

   .routes-sent {
     text-align: center;
     h5 {
       font-weight: lighter;
       display: inline-block;

       &.current-day {
         color: #FF0000;
       }
     }
   }

   .wall-list-container {
     padding: 16px;
     padding-bottom: 50px;
   }

   #route-dist-container {
     display: flex;
     height: 40vh;
     background-color: white;
     margin: 16px;
   }

   #route-pie-chart-container {
     display: flex;
     height: 40vh;
     background-color: white;
     margin-left: 16px;
     margin-right: 16px;
   }

   .panel-container {
     display: flex;
     flex-grow: 1;
     flex-direction: column;
     .card-panel {
       flex-grow: 1;
       display: flex;
       flex-direction: column;
     }
     h6 {
       display: flex;
       flex-grow: 1;
       color: white;
       font-size: 1.2em;
       font-weight: 100;
       text-decoration: underline;
     }

     span {
       font-weight: 100;
       color: white;
       align-items: center;
       &.time {
         margin-left: auto;
       }
     }

     .hour-container {
       display: flex;
     }
   }
 }

</style>
