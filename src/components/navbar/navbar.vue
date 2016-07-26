<template>
  <div class="navbar-fixed" id="navbar" v-show="visible">
    <div class="nav-wrapper">
      <nav>
        <a href="#!" class="brand-logo center">{{header}}</a>
        <!-- <ul class="right hide-on-med-and-down">
             <li><a class="waves-effect waves-light" href="#!/gym">Gym</a></li>
             <li><a class="waves-effect waves-light" href="#!/walls">Walls</a></li>
             <li><a class="waves-effect waves-light" href="#!/routes">Routes</a></li>
             <li v-show="!currentUser" @click="openLoginModal"><a class="waves-effect waves-light" href="#loginModal">Login</a></li>
             <li v-show="currentUser"><a @click="logout" class="waves-effect waves-light">Logout</a></li>
             </ul> -->
        <!-- <ul id="slide-out" class="side-nav">
             <div class="nav-brand"></div>
             <li v-bind:class="{'active': activeTab === 'gym'}"><a class="waves-effect waves-light" href="#!/gym"><i class="medium material-icons">language</i>Gym</a></li>
             <li v-bind:class="{'active': activeTab === 'walls'}"><a class="waves-effect waves-light" href="#!/walls"><i class="medium material-icons">view_module</i>Walls</a></li>
             <li v-bind:class="{'active': activeTab === 'routes'}"><a class="waves-effect waves-light" href="#!/routes"><i class="medium material-icons">view_list</i>Routes</a></li>
             <li v-show="currentUser" v-bind:class="{'active': activeTab === 'user'}"><a class="waves-effect waves-light" href="#!/stats"><i class="medium material-icons">equalizer</i>My Stats</a></li>
             <li @click="openLoginModal" v-show="!currentUser"><a class="waves-effect waves-light"><i class="medium material-icons">person_pin</i>Login</a></li>
             <li v-show="currentUser"><a class="waves-effect waves-light" @click="logout" class="waves-effect waves-light"><i class="medium material-icons">settings_power</i>Logout</a></li>
             </ul> -->
        <a v-if="!navigateBack" class="button-collapse menu-button" v-link="{name: 'menu'}" @click.stop="onMenu = true;"><i class="material-icons side-nav-icon">menu</i></a>
        <a v-if="navigateBack"  class="back-button" href="javascript:history.go(-1)" ><i class="material-icons side-nav-icon">keyboard_backspace</i></a>

        <!-- <a v-if="true"  class="back-button right" href="javascript:history.go(-1)"><img src="/images/sbp_stamp.png"></a> -->
        <!-- <i class="material-icons alerts-icon">notifications</i> -->
      </nav>
    </div>
  </div>
</template>

<script>
 import UserModel from '../../RMS/src/models/UserModel.js'
 import BaseComponent from '../../RMS/src/components/base/baseComponent.vue'
 var Navbar = BaseComponent.extend({
   name: 'Navbar',
   data(){
     return {
       navigateBack: false,
       onMenu: true,
       currentUser: {},
       activeTab: "",
       visible: true,
       header: "Seattle Bouldering Project"
     }
   },
   ready(){
     /* $('.button-collapse').sideNav({
        menuWidth: 280,
        closeOnClick: true
        }); */

     this.currentUser = UserModel.currentUser;
     this.notifications.listenFor('Navbar.setHeader', this.setHeader, this);
     this.notifications.listenFor('Navbar.setActiveTab', this.setActiveTab, this);
     this.notifications.listenFor('Navbar.setVisible', this.setVisible, this);
     this.notifications.listenFor('Navbar.setNavigateBack', this.setNavigateBack, this);
     this.notifications.listenFor('User.login', this.onUserLogin, this);
     this.notifications.listenFor('User.logout', this.onUserLogout, this);
   },

   methods: {
     openLoginModal(event){
       $('#loginModal').openModal();
     },
     onUserLogin(e){
       this.currentUser = UserModel.currentUser;
     },
     onUserLogout(e){
       this.currentUser = null;
     },
     setHeader(e, newHeader){
       this.header = newHeader;
     },
     setNavigateBack(e, navigateBack){
       this.navigateBack = navigateBack;
     },
     setActiveTab(e, tab){
       this.activeTab = tab;
     },
     setVisible(e, visible){
       this.visible = visible;
     },
     logout(){
       UserModel.logout();
     }
   },
 });

 export default Navbar;
</script>

<style lang="sass">
 @import '../../styles/main.scss';
 #navbar {
   nav {
     background-color: $color-base-orange;
     border-bottom: 2px solid darken($color-base-orange, 6%);
     background-image: url("../../../images/mountains.png");
     background-size: 50%;
     background-repeat: no-repeat;
     background-position: 50% 10px;
     box-shadow: none !important;

     .menu-button {
       cursor: pointer;
     }

     .back-button {
       height: 20px;
       width: 20px;
       cursor: pointer;
     }

     .nav-brand {
       height: 10em;
       background-image: url("../../../images/sbp_navbar.png");
       background-size: cover;
     }

     .brand-logo {
       max-width: 65vw;
       font-weight: 300;
       text-transform: uppercase;
       font-size: .85em;
       letter-spacing: .1em;
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

   .side-nav-icon {
     font-size: 1.8em;
     padding-left: .5em;
     padding-right: .8em;
     color: rgba(255, 255, 255, .95);
   }

   .alerts-icon {
     cursor: pointer;
     float: right;
     font-size: 1.4em;
     padding-left: .5em;
     padding-right: .8em;
     color: rgba(255, 255, 255, .95);
   }
 }
</style>
