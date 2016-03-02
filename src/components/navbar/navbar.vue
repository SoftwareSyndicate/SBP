<template>
  <div class="navbar-fixed" id="navbar">
    <div class="nav-wrapper">
      <nav class="blue">
        <a href="#!" class="brand-logo center">{{header}}</a>
        <ul class="right hide-on-med-and-down">
          <li><a class="waves-effect waves-light" href="#!/gym">Gym</a></li>
          <li><a class="waves-effect waves-light" href="#!/walls">Walls</a></li>
          <li><a class="waves-effect waves-light" href="#!/routes">Routes</a></li>
          <li v-show="!currentUser" @click="openLoginModal"><a class="waves-effect waves-light" href="#loginModal">Login</a></li>
          <li v-show="currentUser"><a @click="logout" class="waves-effect waves-light">Logout</a></li>
        </ul>
        <ul id="slide-out" class="side-nav">
          <div class="nav-brand"></div>
          <li><a class="waves-effect waves-light" href="#!/gym">Gym</a></li>
          <li><a href="#!/walls">Walls</a></li>
          <li><a href="#!/routes">Routes</a></li>
          <li @click="openLoginModal" v-show="!currentUser"><a>Login</a></li>
          <li v-show="currentUser"><a @click="logout" class="waves-effect waves-light">Logout</a></li>
        </ul>
        <a data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>
      </nav>
    </div>
  </div>
</template>

<script>
 import notifications from '../../services/NotificationService'
 import UserModel from '../../models/UserModel.js'
 export default {
   name: 'Navbar',
   props: ['header'],
   el: '#navbar',

   data(){
     return {
       currentUser: {}
     }
   },

   ready(){
     $('.button-collapse').sideNav({
       menuWidth: 280,
       closeOnClick: true
     });

     this.currentUser = UserModel.currentUser;
     notifications.listenFor('Navbar.setHeader', this.setHeader, this);
     notifications.listenFor('User.login', this.onUserLogin, this);
     notifications.listenFor('User.logout', this.onUserLogout, this);
   },

   methods: {
     openLoginModal(event){
       $('#loginModal').openModal();
     },
     onUserLogin(event){
       this.currentUser = UserModel.currentUser;
     },
     onUserLogout(event){
       this.currentUser = null;
     },
     setHeader(event, newHeader){
       this.header = newHeader;
     },
     logout(){
       UserModel.logout();
     }
   },
 }
</script>

<style lang="sass">
 nav {
   .nav-brand {
     height: 10em;
     background-image: url("/static/images/sbp_navbar.png");
     background-size: cover;
   }

   .brand-logo {
     max-width: 65vw;
     overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
   }

   @media (max-width: 990px){
     li {
       padding: 0px !important;
     }
   }
 }
</style>
