<template>
  <navbar :header="header"></navbar>
  <login-modal></login-modal>
  <sign-up-modal></sign-up-modal>

  <!-- main view -->
  <overlay></overlay>
  <div id="wrapper">
    <router-view
        class="view"
        transition
        transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
 import Overlay from './overlay/overlay.vue'
 import Navbar from './navbar/navbar.vue'
 import LoginModal from './loginModal/loginModal.vue'
 import SignUpModal from './signUpModal/signUpModal.vue'

 export default {
   name: 'LoginPage',
   data: function(){
     return {
       header: "R.M.S"
     }
   },
   ready(){
     $('#splash-screen').fadeOut(800);
   },
   components: {
     Navbar,
     LoginModal,
     SignUpModal,
     Overlay
   },
  //  events: {
  //    'update-navbar-header': function(newHeader){
  //      this.header = newHeader;
  //    }
  //  }
 };
</script>


<style lang="sass">
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
 #wrapper {
   position: relative;
   width: 85%;
   height: 100%;
   margin: 0 auto;
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
   margin: 0 !important;
 }
 h1, h2, h3, h4, h5, h6 {
   margin: 0 !important;
 }

</style>
