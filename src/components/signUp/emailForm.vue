<template>
  <div class="email-form">
    <p class="headline" v-if="!showError">
      {{errorMessage}}
    </p>
    <div class="" v-else>
      <p class="headline">
        This email is already in use.
      </p>
      <p class="headline">
        Try another?
      </p>
    </div>
    <div class="input-wrapper" :class="{error: showError}">
      <input placeholder="username@email.com" id="first" type="text" class="validate" v-model="email">
      <input placeholder="your password" id="last" type="password" class="validate" v-model="password" @keyup.enter="signUp()">
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'rms-components/base/baseComponent.vue'
 import UserModel from 'rms-models/UserModel.js'

 var EmailForm = BaseComponent.extend({
   name: 'EmailForm',
   data(){
     return {
       firstName: UserModel.firstName,
       lastName: UserModel.lastName,
       email: "",
       password: "",
       valid: false,
       inputFocused: false,
       showError: false,
       errorMessage: ""
     }
   },
   created(){
     this.notifications.listenFor("Input.focused", function(){this.inputFocused = true}, this);
     this.notifications.listenFor("Input.blured", function(){this.inputFocused = false}, this);

     this.$dispatch('setNavHeaderVisible', true);
     this.$dispatch('nav-set-right-text', 'Sign Up');
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
   events: {
     'nav-left-click': function(){
       this.$router.go({name: 'name'});
     },
     'nav-right-click': function(){
       this.signUp();
     }
   },
   notifs(){
     return {
       "UserModel.userUpdated": "onUserUpdated"
     }
   },

   methods: {
     signUp(){
       if(UserModel.isValidCreds(this.email, this.password)){
         this.showLoadingAnimation();
         UserModel.signUpWithEmail(this.email, this.password).then(results => {
           UserModel.firebaseUser = firebase.auth().currentUser;
           UserModel.createUser(UserModel.firebaseUser.uid, UserModel.firstName, UserModel.lastName).then(results => {
             UserModel.watchCurrentUser(UserModel.firebaseUser.uid);

           }, error => {
           })
         }, error => {
           this.hideLoadingAnimation();
           this.error = true;
           this.errorMessage = error.message;
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
     },
     onUserUpdated(){
       this.hideLoadingAnimation();
       this.$router.go({name: 'profile'});
     }
   }
 });

 export default EmailForm;
</script>

<style lang="scss">
 @import '~sbpStyles/main.scss';

 .email-form {
   padding: 0 25px;
   padding-top: 60px;

   .headline {
     font-size: 22px;
     font-weight: 100;
     color: white;
   }

   .input-wrapper {
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     margin-top: 15px;
     input {
       display: flex;
       flex-basis: 100%;
       box-sizing: border-box;
     }

     &.error {
       input {
         color: red;
         background: rgb(255, 207, 221);
       }
     }
   }
 }
</style>
