<template>
  <div class="email-form">
    <div class="header-container">
      <p class="header">
        Email & Password
      </p>
      <span>&nbsp</span>
    </div>
    <form>
      <div class="inputs">
        <input placeholder="Enter your email address" id="email" type="email" class="validate" v-model="email" >
        <input placeholder="Password" id="password" type="password" class="validate" v-model="password">
      </div>
      <p v-if="!valid">You'll use this email when you log in and if you ever need to reset your password</p>
      <a class="waves-effect waves-dark btn btn-primary" @click.stop="signUp()" v-if="valid"><i class="material-icons right" >arrow_forward</i>Continue</a>
    </form>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'
 import UserModel from '../../models/UserModel.js'

 var EmailForm = BaseComponent.extend({
   name: 'EmailForm',
   data(){
     return {
       firstName: UserModel.firstName,
       lastName: UserModel.lastName,
       email: "",
       password: "",
       valid: false
     }
   },
   created(){

   },
   ready(){
     this.$watch('email', function(val){
       this.email = val;
       this.isValid(this.email, this.password);
     });
     this.$watch('password', function(val){
       this.password = val;
       this.isValid(this.email, this.password);
     });
   },

   methods: {
     signUp(){
       if(UserModel.isValidCreds(this.email, this.password)){
         UserModel.signUp(this.firstName, this.lastName, this.email, this.password).then(results => {
           this.$router.go({name: 'profile'});
         }, error => {
           Materialize.toast(error.message, 3000);
           console.error(error);
         });
       }
     },
     isValid(email, password){
       this.valid = true;
       if(email.length === 0){
         this.valid = false;
       }
       if(password.length === 0){
         this.valid = false;
       }
       return this.valid;
     }
   }
 });

 export default EmailForm;
</script>

<style lang="sass">
 @import '../../styles/main.scss';
 .email-form {
   .header-container {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     margin-top: 8em;
     padding-left: $signUp-page-padding;
     padding-right: $signUp-page-padding;
     .header {
       font-weight: 100;
       font-size: 1.3em;
       color: rgba(255, 255, 255, 1);
       margin-bottom: .5em !important;
     }

     span {
       margin-bottom: 1.2em;
       display: block;
       height: 3px;
       width: 3em;
       border-bottom: 2px solid darken($color-base-orange, 10%)
     }
   }

   form {
     display: flex;
     flex-direction: column;
     width: 85%;
     margin-right: auto;
     margin-left: auto;

     .inputs {
       display: flex;
       flex-wrap: wrap;
       input {
         display: flex;
         flex-grow: 1;
         flex-basis: 100%;
         margin-left: .5em;
         margin-right: .5em;
       }
     }

     p {
       padding-left: 1.5em !important;
       padding-right: 1.5em !important;
       font-size: .9em;
       font-weight: 100;
       text-align: center;
       color: rgba(255, 255, 255, .9);
     }

     .btn {
       font-weight: 300;
       padding-right: 30%;
       padding-left: 30%;
       background-color: darken($color-base-orange, 8%) !important;
       box-shadow: none;
       color: white !important;
       width: 100%;
       margin-right: auto;
       margin-left: auto;
       /* transition: opacity .5s ease;
          &.v-enter, &.v-leave {
          opacity: 0;
          } */

     }

     a.sign-up {
       color: white;
       text-decoration: underline;
       margin: auto !important;
       margin-top: 1.5em !important;
       cursor: pointer;
     }
   }
 }
</style>
