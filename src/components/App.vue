<template>
  <div>
    <div class="ios-padding" v-if="ios"></div>
    <navbar></navbar>
    <overlay></overlay>

    <!-- main view -->
    <div id="wrapper">
      <router-view
          class="view"
          transition
          transition-mode="out-in">
      </router-view>
    </div>
  </div>
</template>

<script>
 import Overlay from './overlay/overlay.vue'
 import Navbar from './navbar/navbar.vue'
 import WallModel from '../RMS/src/models/WallModel.js'
 import RouteModel from '../RMS/src/models/RouteModel.js'
 import SentRouteModel from '../RMS/src/models/SentRouteModel.js'
 import UserModel from '../RMS/src/models/UserModel.js'
 import NotificationModel from '../RMS/src/models/NotificationModel.js'

 import BaseComponent from '../RMS/src/components/base/baseComponent.vue'

 var App = BaseComponent.extend({
   name: 'App',
   components: {
     Navbar,
     Overlay
   },
   data(){
     return {
       loaded: true,
       resourcesLoaded: false,
       ios: false,
       android: false,
       browser: true
     }
   },
   created(){
     if(UserModel.currentUser){
       this.getResources();
     }
   },
   ready(){
     this.ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
     this.browser = !this.ios;
   },
   notifs(){
     return {
       'UserModel.userUpdated': 'getResources'
     }
   },
   methods: {
     getResources(){
       if(!this.resourcesLoaded){
         WallModel.watchAllWallsInGym(window.gymId); // TODO MAKE CONFIG FOR SBP - remove gym id
         RouteModel.watchAllRoutesInGym(window.gymId); // TODO MAKE CONFIG FOR SBP - remove gym id
         SentRouteModel.watchAllRoutesByUserId(UserModel.currentUser.id); // TODO MAKE CONFIG FOR SBP - remove gym id
         NotificationModel.watchAllNotifications(window.gymId);
         this.resourcesLoaded = true;
       }
     }
   }
 });

 export default App;
</script>


<style lang="scss">
 @import '../styles/cordova.scss';
 $body-background-color: #f5f6fa;
 html {
   height: 100%;
   background-color: $body-background-color;
 }
 body {
   height: 100%;
   background-color: $body-background-color;
 }

 .ios-padding {
   height: 22px;
   background-color: black;
 }

 #wrapper {
   position: relative;
   height: 100%;
   margin: 0 auto;

   &.ios {
     padding-top: 22px;
     background-color: black;
   }
 }
 .view {
   position: absolute;
   width: 100%;
   background-color: $body-background-color;
   transition: opacity .2s ease;
   box-sizing: border-box;
   &.v-enter, &.v-leave {
     opacity: 0;
   }
 }

 #splash-screen {
   position: absolute;
   background-color: white;
   width: 100vw;
   height: 100vh;
   z-index: 99999999;
 }
 p {
   margin: 0;
 }
 h1, h2, h3, h4, h5, h6 {
   margin: 0 !important;
 }

</style>
