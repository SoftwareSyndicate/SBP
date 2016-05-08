<template>
  <div class="email-form">
    <div class="header-container" v-bind:class="{'keyboardActive': inputFocused}">
      <p class="header">
        Email & Password
      </p>
      <span>&nbsp</span>
    </div>
    <form>
      <div class="inputs">
        <input placeholder="Enter your email address" id="email" type="email" class="validate" v-model="email" onfocus="onInputFocused()" onblur="onInputBlured()">
        <input placeholder="Password" id="password" type="password" class="validate" v-model="password" @keyup.enter="signUp()" onfocus="onInputFocused()">
      </div>
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
       valid: false,
       inputFocused: false
     }
   },
   created(){
     this.notifications.listenFor("Input.focused", function(){this.inputFocused = true}, this);
     this.notifications.listenFor("Input.blured", function(){this.inputFocused = false}, this);
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
         this.showLoadingAnimation();
         UserModel.signUp(this.firstName, this.lastName, this.email, this.password).then(results => {
           this.$router.go({name: 'profile'});
         }, error => {
           this.hideLoadingAnimation();
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
     margin-top: 45%;
     padding-left: $signUp-page-padding;
     padding-right: $signUp-page-padding;
     .header {
       font-weight: 300;
       font-size: 1.3em;
       color: rgba(255, 255, 255, 1);
       margin-bottom: 1em !important;
     }

     span {
       margin-bottom: 1.5em;
       display: block;
       height: 3px;
       width: 3em;
       border-bottom: 2px solid darken($color-base-orange, 10%)
     }

     &.keyboardActive {
       margin-top: 15% !important;
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
         margin-left: 0px !important;
         margin-right: 0px !important;
       }
     }

     p {
       padding-left: 1.5em !important;
       padding-right: 1.5em !important;
       font-size: .9em;
       font-weight: 300;
       text-align: center;
       color: rgba(255, 255, 255, .9);
     }

     .btn {
       padding-top: .75em !important;
       height: 4.5rem;
       font-weight: 300;
       padding-right: 30%;
       padding-left: 30%;
       background-color: darken($color-base-orange, 8%) !important;
       box-shadow: none;
       color: white !important;
       width: 100%;
       margin-right: auto;
       margin-left: auto;
       font-size: 16px !important;
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
