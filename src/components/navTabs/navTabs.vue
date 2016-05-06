<template>
  <div class="nav-tabs" v-if="visible">
    <ul class="tabs z-depth-1">
      <li class="tab col s3 z-depth-1" v-bind:class="{'active': wallsTabVisible}" @click="setActiveTab('walls')" v-link="{name: 'walls'}">
        <p class="tab-name">Walls</p>
        <a href="#tab-walls" class="">
          <i class="material-icons">dns</i>
        </a>
      </li>
      <li class="tab col s3 z-depth-1" v-bind:class="{'active': layoutTabVisible}" @click="setActiveTab('layout')" v-link="{name: 'layout'}">
        <p class="tab-name">Layout</p>
        <a href="#tab-layout" class="">
          <i class="material-icons">equalizer</i>
        </a>
      </li>
      <li class="tab col s3 z-depth-1" v-bind:class="{'active': profileTabVisible}" @click="setActiveTab('profile')" v-link="{name: 'profile'}">
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
       visible: true
     }
   },
   created(){
     this.notifications.listenFor('NavTabs.setVisible', this.setVisible, this);
     this.notifications.listenFor('NavTabs.setActiveTab', this.setActiveTab, this);
   },
   ready(){
     $('ul.tabs').tabs();
     this.setActiveTab(null, this.$route.name);
   },

   methods: {
     setActiveTab(e, tab){
       if(tab === "layout"){
         this.layoutTabVisible = true;
         this.wallsTabVisible = false;
         this.profileTabVisible = false;
       } else if(tab === "walls"){
         this.layoutTabVisible = false;
         this.wallsTabVisible = true;
         this.profileTabVisible = false;
       } else if(tab === "profile"){
         this.layoutTabVisible = false;
         this.wallsTabVisible = false;
         this.profileTabVisible = true;
       } else {
         this.layoutTabVisible = false;
         this.wallsTabVisible = false;
         this.profileTabVisible = false;
       }
     },
     setVisible(e, visible){
       this.visible = visible;
     }
   }
 });

 export default NavTabs;
</script>

<style lang="sass">
 $cell-padding: 1.4em;
 $cell-border: 2px rgba(215, 218, 230, .5) solid;

 .nav-tabs {
   position: fixed;
   z-index: 9999;
   top: calc(100vh - 50px);
   height: 50px;
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
       box-shadow: none !important;
       border-right: solid 1px rgba(0, 0, 0, .3);

       &:last-child {
         border-right: none;
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
 }
</style>
