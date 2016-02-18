<template>
  <div id="loginModal" class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
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
         console.log("loginModal.created()");
         //$('#loginModal').openModal();
       });
     })(jQuery);
   }
 }
</script>

<style>

</style>
