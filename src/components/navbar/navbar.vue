<template>
  <div class="navbar-fixed" id="navbar" v-show="visible" :class="{'shadow': shadow, 'ios': ios}">
    <div class="nav-wrapper">
      <nav :class="{'ios': ios}">
        <a href="#!" class="brand-logo center">{{header}}</a>
        <a v-if="!navigateBack" class="button-collapse menu-button" v-link="{name: 'menu'}" @click.stop="onMenu = true;"><img src="~images/menu.svg" class="menu-image"/></a>
        <a v-if="navigateBack"  class="back-button" href="javascript:history.go(-1)" ><i class="material-icons side-nav-icon">keyboard_backspace</i></a>
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
       header: "Seattle Bouldering Project",
       shadow: false,
       ios: false
     }
   },
   ready(){
     /* $('.button-collapse').sideNav({
        menuWidth: 280,
        closeOnClick: true
        }); */
     this.ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
     this.currentUser = UserModel.currentUser;
     this.notifications.listenFor('Navbar.setHeader', this.setHeader, this);
     this.notifications.listenFor('Navbar.setActiveTab', this.setActiveTab, this);
     this.notifications.listenFor('Navbar.setVisible', this.setVisible, this);
     this.notifications.listenFor('Navbar.setNavigateBack', this.setNavigateBack, this);
     this.notifications.listenFor('User.login', this.onUserLogin, this);
     this.notifications.listenFor('User.logout', this.onUserLogout, this);

     $('body').on('wheel.navbar touchmove.navbar', this.onScroll());
     this.onScroll()(); // eval the shadow immediately

   },
   beforeDestroy(){
     $('body').off('.navbar');
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
     },
     onScroll(){
       let self = this;
       return function(){
         let body = $(this);
         if(body.scrollTop() > 5){
           self.shadow = true;
         } else {
           self.shadow = false;
         }
       }
     }
   }
 });

 export default Navbar;
</script>

<style lang="scss">
 @import '../../styles/main.scss';
 #navbar {

   nav {
     background-color: $color-base-orange;
     border-bottom: 2px solid darken($color-base-orange, 6%);
     /* background-image: url("../../../images/mountains.png"); */
     background-size: 50%;
     background-repeat: no-repeat;
     background-position: 50% 10px;
     transition: all 300ms;


     &.ios {
       padding-top: 16px;
       height: 70px;
     }

     .menu-button {
       cursor: pointer;

       img {
         height: 14px;
         padding-left: 22px;
         padding-right: 22px;
       }
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
       font-size: 1.1rem;
       letter-spacing: .05rem;
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

   &:not(.shadow){
     nav {
       box-shadow: none !important;
     }
   }
 }
</style>
