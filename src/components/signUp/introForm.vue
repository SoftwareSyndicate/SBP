<template>
  <div class="intro-form">
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
      <p>We created a new app to help notify you of new walls being set. We're excited to have you be a part of our community!</p>
      <a class="waves-effect waves-dark btn btn-primary" v-link="{name: 'name'}"><i class="material-icons right">arrow_forward</i>Create an account</a>
    </form>

    <img src="../../../images/mountains.png">
    <!-- <div class="footer-container">
         <p>Alredy have an account?</p>
         </div> -->
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'
 import UserModel from '../../models/UserModel.js'

 var IntroForm = BaseComponent.extend({
   name: 'IntroForm',
   data(){
     return {

     }
   },
   created(){

   },

   methods: {

   }
 });

 export default IntroForm;
</script>

<style lang="sass">

 @import '../../styles/main.scss';

 .intro-form {
   height: 100%;
   display: flex;
   flex-wrap: wrap;
   flex-basis: 100%;
   flex-direction: column;
   background: $gradient-background;

   .header-container {
     margin-top: 10em;
     margin-bottom: 1em;
     padding-left: $signUp-page-padding;
     padding-right: $signUp-page-padding;
     .header {
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

     p {
       color: white;
       margin-bottom: 1em !important;
       font-size: .8em;
       font-weight: 300;
     }

     .btn {
       background-color: darken($color-base-orange, 8%) !important;
       box-shadow: none;
       color: white !important;
       width: 100%;
       margin-top: 1em;
       margin-right: auto;
       margin-left: auto;

       i {
         margin-left: 0px !important;
       }
     }
   }

   img {
     width: 100%;
     position: absolute;
     bottom: 32px;
   }

   .footer-container {
     display: flex;
     position: fixed;
     z-index: 2;
     top: calc(100vh - 50px);
     height: 50px;
     width: 100%;
     background-color: darken($color-base-orange, 3%) !important;
     align-items: center;
     justify-content: space-around;
     p {
       font-size: .9em;
       font-weight: 300;
       color: rgba(255, 255, 255, .9);
     }
   }
 }
</style>
