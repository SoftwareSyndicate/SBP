<template>
  <div class="sign-in-page">
    <img src="../../../images/sbp_stamp.png">
    <p>Seattle Bouldering Project</p>

    <form>
      <input placeholder="Email" id="email" type="email" class="validate" v-model="email">
      <input placeholder="Password" id="password" type="password" class="validate" v-model="password">
      <a class="waves-effect waves-dark btn btn-primary" @click.stop="signIn()">Log in</a>
    </form>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'
 import UserModel from '../../models/UserModel.js'

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
     $('ul.tabs').tabs();
   },
   methods: {
     signIn(){
       console.log("signIn");
       this.showLoadingAnimation();
       UserModel.signIn(this.email, this.password).then(results => {
         this.notifications.notify("UserModel.signUp");
         this.$router.go({name: 'layout'});
         console.log(results);
       }, error => {
         Materialize.toast("Sorry, Invalid Credentials", 2000);
         this.hideLoadingAnimation();
       });
     }
   },

   beforeDestroy(){
     this.showLoadingAnimation();
     window.scrollTo(0, 0);
   }
 });

 export default SignInPage;
</script>

<style lang="sass">
 @import '../../styles/main.scss';

 .sign-in-page {
   display: flex;
   flex-wrap: wrap;
   flex-basis: 100%;
   flex-direction: column;
   height: 100%;
   background-color: lighten($color-base-orange, 3%);

   img {
     width: 10em;
     height: 10em;
     margin-right: auto;
     margin-left: auto;
     margin-top: 4em;
     margin-bottom: 1em;
   }

   p {
     font-weight: 100;
     font-size: 1.5em;
     color: white;
     margin-left: auto !important;
     margin-right: auto !important;
     margin-bottom: 2em !important;
   }

   form {
     display: flex;
     flex-direction: column;
     width: 60%;
     margin-right: auto;
     margin-left: auto;

     input {
     }

     .btn {
       width: 60%;
       margin-right: auto;
       margin-left: auto;
     }
   }
 }

</style>
