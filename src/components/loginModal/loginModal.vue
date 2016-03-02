<template>
  <div id="loginModal" class="modal login-modal">
    <div class="modal-content">
      <h5>Login</h5>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="email" class="validate" v-model="email">
              <label for="email">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="password" type="password" class="validate" v-model="password">
              <label for="password">Password</label>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-footer">
      <a href="#" class="modal-action modal-close waves-effect waves-red btn-flat sign-up-button" @click.stop="openSignUpModal">Sign Up</a>
      <a href="#" class="modal-action modal-close waves-effect waves-green btn-flat" @click.stop="login">Submit</a>
    </div>
  </div>
</template>

<script>
 import UserService from '../../services/UserService.js'
 import notifications from '../../services/NotificationService'

 export default {
   name: 'LoginModal',
   el: '#loginModal',
   data(){
     return {
       email: "",
       password: ""
     }
   },
   ready(){

   },

   methods: {
     openSignUpModal(){
       notifications.notify('SignUpModal.open');
     },

     login(){
       console.log("LoginModal.login()");
       console.log(this.email);
       console.log(this.password);
       UserService.login(this.email, this.password);
     }
   }
 }
</script>

<style lang="sass">
 .sign-up-button {
   float: none !important;
 }
</style>
