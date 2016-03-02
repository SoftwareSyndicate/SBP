<template>
  <div id="signUpModal" class="modal">
    <div class="modal-content">
      <h5>Sign Up</h5>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="email" class="validate">
              <label for="email">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="password" type="password" class="validate">
              <label for="password">Password</label>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-footer">
      <a href="#" class="modal-action modal-close waves-effect waves-green btn-flat">Submit</a>
    </div>
  </div>
</template>

<script>
 import UserService from '../../services/UserService.js'
 import notifications from '../../services/NotificationService'

 export default {
   name: 'SignUpModal',
   el: '#signUpModal',
   ready(){
     notifications.listenFor('SignUpModal.open', this.open, this);
   },
   methods: {
     open(){
       $('#signUpModal').openModal();
     }
   }
 }
</script>

<style>

</style>
