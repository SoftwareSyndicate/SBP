<template>
  <div class="name-form">
    <div class="header-container">
      <p class="header">
        What's Your Name?
      </p>
      <span>&nbsp</span>
    </div>
    <form>
      <div class="inputs">
        <input placeholder="First" id="first" type="text" class="validate" v-model="firstName" >
        <input placeholder="Last" id="last" type="text" class="validate" v-model="lastName">
      </div>
      <p v-if="!valid">We want to be able to congratulate you on your climbing progress!</p>
      <a class="waves-effect waves-dark btn btn-primary" @click.stop="proceed()" v-if="valid"><i class="material-icons right">arrow_forward</i>Continue</a>
    </form>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'
 import UserModel from '../../models/UserModel.js'

 var NameForm = BaseComponent.extend({
   name: 'NameForm',
   data(){
     return {
       firstName: "",
       lastName: "",
       valid: false
     }
   },
   created(){

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
       console.log(this.valid);
       return this.valid;
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
   height: 100%;

   .header-container {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     margin-top: 10em;
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
       input {
         display: flex;
         flex-basis: 50%;
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
       padding-right: 30%;
       padding-left: 30%;
       background-color: darken($color-base-orange, 8%) !important;
       box-shadow: none;
       color: white !important;
       width: 100%;
       margin-right: auto;
       margin-left: auto;
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
