<template>
  <div class="email-form">
    <div class="header">
      Email & Password
    </div>
    <form>
      <input placeholder="Email" id="email" type="email" class="validate" v-model="email">
      <input placeholder="Password" id="password" type="password" class="validate" v-model="password">
      <a class="waves-effect waves-dark btn btn-primary" @click.stop="signUp()">Sign Up</a>
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
     }
   },
   created(){

   },

   methods: {
     signUp(){
       if(UserModel.isValidCreds(this.email, this.password)){
         UserModel.signUp(this.firstName, this.lastName, this.email, this.password).then(results => {
           this.$router.go({name: 'profile'});
         }, error => {
           Materialize.toast(error.message, 3000);
           console.log(error);
         });
       }
     }
   }
 });

 export default EmailForm;
</script>

<style lang="sass">

 .email-form {
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

     input {

     }

     .btn {
       width: 60%;
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
