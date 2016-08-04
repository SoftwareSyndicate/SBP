<template>
  <div class="nav-tabs" v-if="visible">
    <ul class="tabs z-depth-1">
      <li class="tab col s3 z-depth-1" v-bind:class="{'active': $route.name == 'walls' || $route.name == 'wall'}" v-link="{name: 'walls'}">
        <p class="tab-name">Walls</p>
        <a href="#tab-walls" class="">
          <i class="material-icons">dns</i>
        </a>
      </li>
      <li class="tab col s3 z-depth-1" v-bind:class="{'active': $route.name == 'news'}" v-link="{name: 'news'}">
        <p class="tab-name">News</p>
        <a href="#tab-layout" class="">
          <i class="material-icons">add_alert</i>
        </a>
      </li>
      <li class="tab col s3 z-depth-1" v-bind:class="{'active': $route.name == 'profile' || $route.name == 'progress'}" v-link="{name: 'profile'}">
        <p class="tab-name">Profile</p>
        <a href="#tab-profile" class="">
          <i class="material-icons">account_circle</i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'
 var NavTabs = BaseComponent.extend({
   name: 'NavTabs',
   data(){
     return {
       wallsTabVisible: false,
       profileTabVisible: false,
       layoutTabVisible: false,
       visible: true,
       currentTab: ""
     }
   },
   created(){
     this.notifications.listenFor('NavTabs.setVisible', this.setVisible, this);
     this.notifications.listenFor('NavTabs.setActiveTab', this.setActiveTab, this);
   },
   ready(){
     this.currentTab = this.$route.name;
   },

   methods: {
     setActiveTab(e, tab){
       this.currentTab = tab;
     },
     setVisible(e, visible){
       this.visible = visible;
     }
   }
 });

 export default NavTabs;
</script>

<style lang="scss">
 @import '../../styles/main.scss';
 $cell-padding: 1.4em;
 $cell-border: 2px rgba(215, 218, 230, .5) solid;

 .nav-tabs {
   position: fixed;
   z-index: 9999;
   top: calc(100vh - 50px);
   height: 50px;

   .indicator {
     display: none !important;
   }

   .tabs {
     border-top: 1px solid rgba(0, 0, 0, .1);
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
         font-weight: 300;
         color: #c9cddc;
         text-transform: capitalize !important;

       }

       i {
         color: #c9cddc;
       }
       box-shadow: none !important;
       /* border-right: solid 1px rgba(0, 0, 0, .3);

          &:last-child {
          border-right: none;
          } */
       &.active {
         box-shadow: none;

         .tab-name {
           color: $color-base-orange;
         }
         i {
           color: $color-base-orange;
         }
       }
     }
   }
 }
</style>
