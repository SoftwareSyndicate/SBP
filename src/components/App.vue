<template>
  <navbar></navbar>
  <login-modal></login-modal>
  <!-- main view -->
  <div id="wrapper">
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


<style lang="stylus">
 #wrapper
   background-color $bg
   position relative
   width 85%
   min-height 80px
   margin 0 auto

 .view
   position absolute
   width: 100%
   background-color $bg
   transition opacity .2s ease
   box-sizing border-box
   &.v-enter, &.v-leave
     opacity 0
</style>
