<template>
  <div class="navbar-fixed" id="navbar">
    <div class="nav-wrapper">
      <nav class="">
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
          <li v-bind:class="{'active': activeTab === 'gym'}"><a class="waves-effect waves-light" href="#!/gym"><i class="medium material-icons">language</i>Gym</a></li>
          <li v-bind:class="{'active': activeTab === 'walls'}"><a class="waves-effect waves-light" href="#!/walls"><i class="medium material-icons">view_module</i>Walls</a></li>
          <li v-bind:class="{'active': activeTab === 'routes'}"><a class="waves-effect waves-light" href="#!/routes"><i class="medium material-icons">view_list</i>Routes</a></li>
          <li v-show="currentUser" v-bind:class="{'active': activeTab === 'user'}"><a class="waves-effect waves-light" href="#!/stats"><i class="medium material-icons">equalizer</i>My Stats</a></li>
          <li @click="openLoginModal" v-show="!currentUser"><a class="waves-effect waves-light"><i class="medium material-icons">person_pin</i>Login</a></li>
          <li v-show="currentUser"><a class="waves-effect waves-light" @click="logout" class="waves-effect waves-light"><i class="medium material-icons">settings_power</i>Logout</a></li>
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
       currentUser: {},
       activeTab: ""
     }
   },

   ready(){
     $('.button-collapse').sideNav({
       menuWidth: 280,
       closeOnClick: true
     });

     this.currentUser = UserModel.currentUser;
     notifications.listenFor('Navbar.setHeader', this.setHeader, this);
     notifications.listenFor('Navbar.setActiveTab', this.setActiveTab, this);
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
     setActiveTab(event, tab){
       this.activeTab = tab;
     },
     logout(){
       UserModel.logout();
     }
   },
 }
</script>

<style lang="sass">
 #navbar {

   nav {
     background-image: url("/static/images/noise.png"), -webkit-radial-gradient(top center, rgb(247, 180, 30), #F13724 750px) !important;

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
       font-weight: 100;
     }

     @media (max-width: 990px){
       li {
         padding: 0px !important;

         a {

         }
         i {
           margin-bottom: 2px;
           margin-right: 10px;
           vertical-align: inherit;
           display: inline-block !important;
           line-height: 2rem !important;
           height: 2rem !important;
         }
       }
     }
   }
 }
</style>
