<template>
  <div class="username-form">
    <p class="headline">
      Login with your email
    </p>
    <div class="input-wrapper">
      <input placeholder="yourname@email.com" id="last" type="email" class="validate" v-model="username" @keyup.enter="proceed()">
    </div>
  </div>
</template>

<script>
import BaseComponent from 'rms-components/base/baseComponent.vue'
import UserModel from 'rms-models/UserModel.js'

var UserameForm = BaseComponent.extend({
  name: 'UserameForm',
  props: [
    'parent'
  ],
  data(){
    return {
      username: "",
      valid: false,
      inputFocused: false
    }
  },
  created(){
    this.notifications.listenFor("Input.focused", function(){this.inputFocused = true}, this);
    this.notifications.listenFor("Input.blured", function(){this.inputFocused = false}, this);
    this.$dispatch('setNavHeaderVisible', true);
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
      UserModel._username = this.username;
      this.$router.go({name: 'password'});
    },
    onInputFocus(){
      console.log("Input Focus");
    }
  }
});

export default UserameForm;
</script>

<style lang="scss" scoped>
@import '~sbpStyles/main.scss';

.username-form {
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
