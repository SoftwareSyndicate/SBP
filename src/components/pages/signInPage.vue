<template>
  <div class="sign-in-page">
    <div class="sign-in-nav" v-if="navVisible">
      <div class="left-container">
        <i class="material-icons" @click="onLeftClick()">arrow_back</i>
      </div>
      <div class="center-container">

      </div>
      <div class="right-container">
        <span @click="onRightClick()">{{rightText}}</span>
      </div>
    </div>
    <router-view :parent="this" class="sign-in-page-form"></router-view>
    <div class="footer-container" v-if="$route.name==='intro'">
      <p class="headline">
        Start tracking your progress at the Seattle Bouldering Project
      </p>
      <button v-link="{name: 'name'}" class="sign-in-button" type="button" name="button">Sign up today</button>
      <p class="have-account" v-link="{name: 'signIn'}">I already have an account?</p>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'rms-components/base/baseComponent.vue'
 import UserModel from 'rms-models/UserModel.js'

 var SignInPage = BaseComponent.extend({
   name: 'SignInPage',
   data(){
     return {
       email: "",
       password: "",
       firstName: "",
       lastName: "",
       error: false,
       navVisible: false,
       rightText: 'Next'
     }
   },
   created(){
     if(UserModel.currentUser){
       this.$router.go({name: 'profile'});
     }
   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "Seattle Bouldering Project");
     this.notifications.notify('Navbar.setVisible', false);
     $('.sign-in-page').css("height", document.body.clientHeight + "px");

     if(window.ios){
       $('#wrapper').css("background-color", "#f3501e");
       $('.sign-up-page').css("height", document.body.clientHeight - 22 + "px");
     } else {
       $('.sign-up-page').css("height", document.body.clientHeight + "px");
     }
   },
   events: {
     setNavHeaderVisible(visible){
       this.navVisible = visible;
     },
     'nav-set-right-text': function(text){
       this.rightText = text;
     }
   },
   methods: {
     onRightClick(){
       this.$broadcast('nav-right-click');
     },
     onLeftClick(){
       this.$broadcast('nav-left-click');
     }
   },

   beforeDestroy(){
     window.scrollTo(0, 0);
     $('#wrapper').css("background-color", "#FFFFFF");
   }
 });

 export default SignInPage;
</script>

<style lang="scss">
 @import '~sbpStyles/main.scss';

 .sign-in-page {
   display: flex;
   flex-wrap: wrap;
   flex-basis: 100%;
   flex-direction: column;
   height: 100%;
   background: $gradient-background;

   .sign-in-nav {
     background-color: $color-orange-1;
     height: 50px;
     width: 100%;
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 0 15px;
     position: absolute;
     top: 0px;
     left: 0px;

     span,
     .material-icons {
       color: white;
     }

     & + .sign-in-page-form {
       margin-top: 50px;
     }
   }

   .footer-container {
     display: flex;
     position: fixed;
     z-index: 2;
     bottom: 0px;
     height: 200px;
     width: 100%;
     background-color: $color-orange-2;
     align-items: center;
     justify-content: center;
     flex-direction: column;
     padding: 0 60px;
     p {
       margin-top: auto;
       margin-bottom: 10px;
       font-size: .9em;
       font-weight: 300;
       color: rgba(255, 255, 255, .9);

       &.headline {
         font-size: 1.2em;
         text-align: center;
       }
       &.have-account {
         margin-bottom: 20px;
       }
     }

     .sign-in-button {
       background-color: darken($color-orange-1, 10);
       border-bottom: 3px solid darken($color-orange-1, 20);
       width: 100%;
       color: white;
     }
   }
   //  img {
     //    width: 100%;
     //    position: absolute;
     //    bottom: 32px;
     //  }
 }

</style>
