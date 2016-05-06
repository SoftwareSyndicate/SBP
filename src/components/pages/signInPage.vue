<template>
  <div class="sign-in-page">
    <div class="header-container">
      <p class="header">
        Seattle
        <br>
        Bouldering
        <br>
        Project
      </p>
    </div>

    <form>
      <input placeholder="Email" id="email" type="email" class="validate" v-model="email">
      <input placeholder="Password" id="password" type="password" class="validate" v-model="password" @keyup.enter="signIn()">
      <a class="waves-effect waves-dark btn btn-primary" @click.stop="signIn()">Log in</a>
      <a class="forgot-password">Forgot your password?</a>
    </form>

    <img src="../../../images/mountains.png">
    <div class="footer-container" v-link="{name: 'signUp'}">
      <div class="message">
        <p>New to our app?</p>
        <p class="create">Create a SBP Mobile Account</p>
      </div>
      <i class="material-icons">keyboard_arrow_right</i>
    </div>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'
 import UserModel from '../../models/UserModel.js'
 import RouteModel from '../../models/RouteModel.js'

 var SignInPage = BaseComponent.extend({
   name: 'SignInPage',
   data(){
     return {
       email: "",
       password: "",
       error: false
     }
   },
   created(){
     if(UserModel.currentUser){
       this.$router.go({name: 'layout'});
     }
     this.notifications.notify('Navbar.setHeader', "seattle bouldering project");
     this.hideLoadingAnimation();
   },
   ready(){
     this.notifications.notify('Navbar.setVisible', false);
     $('.sign-in-page').css("height", document.body.clientHeight + "px");
   },
   methods: {
     signIn(){
       if(UserModel.isValidCreds(this.email, this.password)){
         this.showLoadingAnimation();
         UserModel.signIn(this.email, this.password).then(results => {
           this.notifications.notify("UserModel.signUp");
           RouteModel.getSentRoutes();
           this.$router.go({name: 'layout'});
           console.log(results);
         }, error => {
           Materialize.toast("Sorry, Invalid Credentials", 2000);
           this.hideLoadingAnimation();
         });
       }
     }
   },

   beforeDestroy(){
     this.notifications.notify('Navbar.setVisible', true);
     this.showLoadingAnimation();
     window.scrollTo(0, 0);
   }
 });

 export default SignInPage;
</script>

<style lang="sass">
 @import '../../styles/main.scss';

 .sign-in-page {
   height: 100%;
   display: flex;
   flex-wrap: wrap;
   flex-basis: 100%;
   flex-direction: column;
   background: $gradient-background;

   .header-container {
     margin-top: 8em;
     margin-bottom: 2em;
     padding-left: $signUp-page-padding;
     padding-right: $signUp-page-padding;
     .header {
       letter-spacing: .2em;
       text-transform: uppercase;
       font-weight: 300;
       font-size: 1.1em;
       color: white;
     }
   }

   form {
     padding-left: $signUp-page-padding;
     padding-right: $signUp-page-padding;
     display: flex;
     flex-direction: column;

     input {
       margin-bottom: 10px !important;
       width: initial;
     }

     .btn {
       padding-top: .5em !important;
       height: 4rem;
       font-weight: 300;
       background-color: darken($color-base-orange, 8%) !important;
       box-shadow: none;
       color: white !important;
       width: 100%;
       margin-top: .5em;
       margin-right: auto;
       margin-left: auto;
       font-size: 16px !important;
     }

     a.forgot-password {
       color:  darken($color-base-orange, 18%) !important;
       font-size: .9em;
       margin: auto !important;
       margin-top: 1.5em !important;
       cursor: pointer;
     }
   }

   img {
     width: 100%;
     position: absolute;
     bottom: 52px;
   }

   .footer-container {
     display: flex;
     padding: 1.5em;
     position: fixed;
     z-index: 2;
     top: calc(100vh - 100px);
     height: 100px;
     width: 100%;
     background-color: white;
     align-items: center;

     .message {
       flex-basis: 70%;

       p {
         color: rgba(0, 0, 0, .5);

         &.create {
           color: $color-base-orange;
         }
       }
     }

     i {
       font-size: 1.5em;
       padding: 6px;
       margin-left: auto;
       border-radius: 50%;
       background-color: rgba(0, 0, 0, .1);
       color: rgba(0, 0, 0, .5);
     }
   }

 }

</style>
