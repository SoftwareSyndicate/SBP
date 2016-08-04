<template>
  <div class="password-form">
    <p class="headline">
      Add your password
    </p>
    <div class="input-wrapper">
      <input placeholder="password" id="last" type="password" class="validate" v-model="password" @keyup.enter="proceed()">
    </div>
  </div>
</template>

<script>
import BaseComponent from '../../RMS/src/components/base/baseComponent.vue'
import UserModel from '../../RMS/src/models/UserModel.js'

var PasswordForm = BaseComponent.extend({
  name: 'PasswordForm',
  props: [
    'parent'
  ],
  data(){
    return {
      password: "",
      valid: false,
      inputFocused: false
    }
  },
  created(){
    this.notifications.listenFor("Input.focused", function(){this.inputFocused = true}, this);
    this.notifications.listenFor("Input.blured", function(){this.inputFocused = false}, this);
    this.$dispatch('setNavHeaderVisible', true);
    this.$dispatch('nav-set-right-text', 'Login');
  },
  ready(){
  },
  events: {
    'nav-left-click': function(){
      this.$router.go({name: 'signUp'})
    },
    'nav-right-click': function(){
      this.proceed();
    }
  },
  methods: {
    proceed(){
      this.showLoadingAnimation();
      UserModel.signInWithEmail(UserModel._username, this.password).then(results => {
        this.$router.go({name: 'profile'});
      }, error => {
        Materialize.toast("Sorry, Invalid Credentials", 2000);
        this.hideLoadingAnimation();
      });
    },
    onInputFocus(){
      console.log("Input Focus");
    }
  }
});

export default PasswordForm;
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";
.password-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  color: rgba(0, 0, 0, .7);
  padding: 0 25px;
  padding-top: 60px;

  //  height: 100%;

  .headline {
    font-size: 22px;
    font-weight: 100;
    color: white;
  }

  .input-wrapper {
    display: flex;
    margin-top: 15px;
    input {
      display: flex;
      flex-basis: 100%;
    }
  }
}
</style>
