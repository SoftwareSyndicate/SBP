<template>
  <div class="sign-up-page">
    <router-view></router-view>
    <img src="../../../images/mountains.png">
    <div class="footer-container" v-link="{name: 'signIn'}">
      <p>Alredy have an account?</p>
    </div>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'
 import UserModel from '../../models/UserModel.js'

 var SignUpPage = BaseComponent.extend({
   name: 'SignUpPage',
   data(){
     return {
       email: "",
       password: "",
       firstName: "",
       lastName: "",
       error: false
     }
   },
   created(){
     if(UserModel.currentUser){
       this.$router.go({name: 'layout'});
     }
     this.hideLoadingAnimation();
   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "Seattle Bouldering Project");
     this.notifications.notify('Navbar.setVisible', false);
     $('.sign-up-page').css("height", document.body.clientHeight + "px");
   },
   methods: {

   },

   beforeDestroy(){
     this.showLoadingAnimation();
     this.notifications.notify('Navbar.setVisible', true);
     window.scrollTo(0, 0);
   }
 });

 export default SignUpPage;
</script>

<style lang="sass">
 @import '../../styles/main.scss';

 .sign-up-page {
   display: flex;
   flex-wrap: wrap;
   flex-basis: 100%;
   flex-direction: column;
   height: 100%;
   background: $gradient-background;

   .footer-container {
     display: flex;
     position: fixed;
     z-index: 2;
     top: calc(100vh - 50px);
     height: 50px;
     width: 100%;
     background-color: darken($color-base-orange, 5%) !important;
     align-items: center;
     justify-content: space-around;
     p {
       font-size: .9em;
       font-weight: 300;
       color: rgba(255, 255, 255, .9);
     }
   }
   img {
     width: 100%;
     position: absolute;
     bottom: 32px;
   }
 }

</style>
