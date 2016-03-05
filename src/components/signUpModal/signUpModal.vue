<template>
  <div id="signUpModal" class="modal">
    <div class="modal-content">
      <h5>Sign Up</h5>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="email" class="validate" v-model="email" data-error="wrong" data-success="right">
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
      <p v-if="hasError" class="error">{{errorMessage}}</p>
    </div>
    <div class="modal-footer">
      <a href="#" class="modal-action waves-effect waves-green btn-flat" @click.stop="signUp">Submit</a>
    </div>
  </div>
</template>

<script>
 import UserModel from '../../models/UserModel.js'
 import notifications from '../../services/NotificationService'

 export default {
   name: 'SignUpModal',
   el: '#signUpModal',
   data(){
     return {
       email: "",
       password: "",
       hasError: true
     }
   },
   ready(){
     notifications.listenFor('SignUpModal.open', this.open, this);
   },
   methods: {
     open(){
       $('#signUpModal').openModal();
     },
     signUp(){
       this.hasError = false;
       notifications.notify("Overlay.setVisible", true);
       UserModel.signUp(this.email, this.password).then(results => {
         notifications.notify("Overlay.setVisible", false);
         $("#signUpModal").closeModal();
       }, error => {
         console.log(error);
         this.hasError = true;
         if(error.code === 202){
           this.errorMessage = "Email " + this.email + " has already been taken";
         }
         notifications.notify("Overlay.setVisible", false);
       });

     }
   }
 }
</script>

<style lang="sass">
 #signUpModal {
   .error {
     text-align: center;
     color: red;
     margin: 0px;
   }

   .sign-up-button {
     float: none !important;
   }

   .row {
     margin-bottom: 0px;
   }
 }

</style>
