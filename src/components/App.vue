<template>
  <navbar></navbar>
  <login-modal></login-modal>
  <!-- main view -->
  <div class="container">
    <router-view
        class="view"
        keep-alive
        transition
        transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
 import Navbar from './navbar/navbar.vue'
 import LoginModal from './loginModal/loginModal.vue'
 export default {
   name: 'LoginPage',

   components: {
     Navbar,
     LoginModal
   },
 };
</script>


<style>

</style>
