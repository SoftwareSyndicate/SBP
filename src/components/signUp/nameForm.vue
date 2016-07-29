<template>
  <!-- <div class="name-form">
  <div class="header-container" v-bind:class="{'keyboardActive': inputFocused}">
  <p class="header">
  What's Your Name?
</p>
<span>&nbsp</span>
</div>
<form>
<div class="inputs">
<input placeholder="First" id="first" type="text" class="validate" v-model="firstName" onfocus="onInputFocused()" onblur="onInputBlured()">
<input placeholder="Last" id="last" type="text" class="validate" v-model="lastName" @keyup.enter="proceed()" onfocus="onInputFocused()">
</div>
<a class="waves-effect waves-dark btn btn-primary" @click="proceed()" v-if="valid"><i class="material-icons right" >arrow_forward</i>Continue</a>
</form>
</div> -->
<div class="name-form">
  <p class="headline">
    What's Your Name?
  </p>
  <div class="input-wrapper">
    <input placeholder="First" id="first" type="text" class="validate" v-model="firstName">
    <input placeholder="Last" id="last" type="text" class="validate" v-model="lastName" @keyup.enter="proceed()">
  </div>
</div>
</template>

<script>
import BaseComponent from '../../RMS/src/components/base/baseComponent.vue'
import UserModel from '../../RMS/src/models/UserModel.js'

var NameForm = BaseComponent.extend({
  name: 'NameForm',
  props: [
    'parent'
  ],
  data(){
    return {
      firstName: "",
      lastName: "",
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
    this.$watch('firstName', function(val){
      this.firstName = val;
      this.isValid(this.firstName, this.lastName);
    });
    this.$watch('lastName', function(val){
      this.lastName = val;
      this.isValid(this.firstName, this.lastName);
    });

    console.log(this.parent);
  },
  events: {
    'nav-left-click': function(){
      this.$router.go({name: 'intro'})
    },
    'nav-right-click': function(){
      this.proceed();
    }
  },
  methods: {
    proceed(){
      if(this.valid){
        UserModel.firstName = this.firstName;
        UserModel.lastName = this.lastName;
        this.$router.go({name: 'email'});
      }
    },
    isValid(first, last){
      this.valid = true;
      if(first.length === 0){
        this.valid = false;
      }
      if(last.length === 0){
        this.valid = false;
      }
      return this.valid;
    },
    onInputFocus(){
      console.log("Input Focus");
    }
  }
});

export default NameForm;
</script>

<style lang="sass">
@import "../../styles/main.scss";
.name-form {
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
      flex-basis: 50%;
      &:first-child {
        margin-right: .5em;
      }

      &:last-child {
        margin-left: .5em;
      }
    }
  }
}
</style>
