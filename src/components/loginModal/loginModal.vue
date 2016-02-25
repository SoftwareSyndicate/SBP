<template>
  <div id="loginModal" class="modal">
    <div class="modal-content">
      <h5>Login</h5>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input id="first_name" type="text" class="validate">
              <label for="first_name">First Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="last_name" type="text" class="validate">
              <label for="last_name">Last Name</label>
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
 export default {
   name: 'LoginModal',
   el: '#loginModal',
   data(){
     return {
       childComments: [],
       open: true
     }
   },
   created(){
     (function($){
       $(function(){
         //$('#loginModal').openModal();
       });
     })(jQuery);
   }
 }
</script>

<style>

</style>
