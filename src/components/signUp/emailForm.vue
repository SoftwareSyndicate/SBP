<template>
  <div class="email-form">
    <!-- <div class="header-container" v-bind:class="{'keyboardActive': inputFocused}">
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
</form> -->
    <p class="headline" v-if="!showError">
      Add an email and password
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
      showError: false
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
  methods: {
    signUp(){
      if(UserModel.isValidCreds(this.email, this.password)){
        this.showLoadingAnimation();
        UserModel.signUpWithEmail(this.email, this.password).then(results => {
          UserModel.firebaseUser = firebase.auth().currentUser;
          UserModel.createUser(UserModel.firebaseUser.uid, UserModel.firstName, UserModel.lastName).then(results => {
            UserModel.watchCurrentUser(UserModel.firebaseUser.uid);
            this.$router.go({name: 'profile'});
          }, error => {

          })
        }, error => {
          this.hideLoadingAnimation();
          console.error(error);
          if(error.code === 202){
            this.showError = true;
          }
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
    flex-direction: column;
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
