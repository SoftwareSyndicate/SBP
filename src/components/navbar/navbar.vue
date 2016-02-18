<template>
  <div class="navbar-fixed">
    <div class="nav-wrapper">
      <nav class="blue">
        <a href="#!" class="brand-logo center">RMS</a>
        <ul class="right hide-on-med-and-down">
          <li><a href="#loginModal">Login</a></li>
          <li><a href="#!">Second Sidebar Link</a></li>
        </ul>
        <ul id="slide-out" class="side-nav">
          <li v-on:click="openLoginModal"><a href="#loginModal">Login</a></li>
          <li><a href="#!">Second Sidebar Link</a></li>
        </ul>
        <a data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>
      </nav>
    </div>
  </div>
</template>

<script>
 
 export default {
   name: 'Navbar',
   data(){
     return {
       childComments: [],
       open: true
     }
   },
   created(){
     (function($){
       $(function(){
         $('.button-collapse').sideNav({
           menuWidth: 280,
           closeOnClick: true
         }
         );
       });
     })(jQuery);
   },
   methods: {
     openLoginModal: function (event) {
       $('#loginModal').openModal();
     }
   }
 }
</script>

<style>

</style>
