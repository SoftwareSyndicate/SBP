<template>
  <div class="name-form">
    <div class="header">
      Get Started
    </div>
    <form>
      <input placeholder="First" id="first" type="text" class="validate" v-model="firstName">
      <input placeholder="Last" id="last" type="text" class="validate" v-model="lastName">
      <a class="waves-effect waves-dark btn btn-primary" @click.stop="proceed()"><i class="material-icons right">forward</i>Continue</a>
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
       lastName: ""
     }
   },
   created(){

   },

   methods: {
     proceed(){
       if(this.isValid(this.firstName, this.lastName)){
         UserModel.firstName = this.firstName;
         UserModel.lastName = this.lastName;
         this.$router.go({name: 'email'});
       }
     },
     isValid(first, last){
       var valid = true;
       if(first.length === 0){
         valid = false;
         Materialize.toast("First Name Required", 3000);
       }
       if(last.length === 0){
         valid = false;
         Materialize.toast("Last Name Required", 3000);
       }

       return valid;
     }

   }
 });

 export default NameForm;
</script>

<style lang="sass">

 .name-form {
   display: flex;
   flex-direction: column;
   flex-grow: 1;
   color: rgba(0, 0, 0, .7);

   .header {
     color: white;
     font-size: 1.8em;
     font-weight: 300;
     text-align: center;
     margin-top: 4em;
     margin-bottom: 2em;
   }

   form {
     display: flex;
     flex-direction: column;
     width: 60%;
     margin-right: auto;
     margin-left: auto;

     .btn {
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
