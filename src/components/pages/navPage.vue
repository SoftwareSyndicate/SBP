<template>
  <div class="nav-page">
    <div class="back-button-container">
      <a class="back-button" href="javascript:history.go(-1)" ><i class="material-icons side-nav-icon">keyboard_backspace</i></a>
    </div>
    <div class="name-container">
      <h6>Seattle</h6>
      <h6>Bouldering</h6>
      <h6>Project</h6>
    </div>
    <div class="nav-list">
      <div class="link">
        <h3 v-link="{name: 'info'}">Gym Info</h3>
      </div>
    </div>
    <img src="../../../images/mountains.png">;
  </div>
</template>
<script>

 import BaseComponent from '../../components/base/baseComponent.vue'

 var NavPage = BaseComponent.extend({
   name: 'NavPage',
   components: {

   },
   data(){
     return {
     }
   },
   created(){
     this.hideLoadingAnimation();
     this.notifications.notify('Navbar.setVisible', false);
     this.notifications.notify('GymPage.setTabsVisible', false);
   },
   ready(){

   },
   methods: {

   },

   beforeDestroy(){
     this.showLoadingAnimation();
     this.notifications.notify('Navbar.setVisible', true);
     this.notifications.notify('GymPage.setTabsVisible', true);
   }
 });

 export default NavPage;

</script>

<style lang="sass">
 @import '../../styles/main.scss';

 $text-padding: 1.8em;
 .nav-page {
   display: flex;
   flex-grow: 1;
   flex-direction: column;
   flex-basis: 100%;
   height: 100vh;
   width: 100vw;
   background-color: lighten($color-base-orange, 3%);

   .back-button-container {
     margin-bottom: 1.5em;
     i {
       color: white;
       padding: .5em;
       font-size: 2em;
     }
   }

   .name-container {
     display: flex;
     flex-direction: column;
     flex-basis: 20%;
     background-color: lighten($color-base-orange, 3%);
     margin-bottom: 2.5em;

     h6 {
       text-transform: uppercase;
       color: white;
       font-size: 1.3em;
       font-weight: 300;
       padding-left: $text-padding;
       padding-bottom: .2em;
       letter-spacing: .2em;
     }
   }

   .nav-list {
     display: flex;
     flex-grow: 1;
     flex-basis: 100%;
     background-color: $color-base-orange;
     padding-top: 4em;

     .link {
       h3 {
         cursor: pointer;
         color: white;
         font-weight: 100;
         font-size: 2em;
         padding-left: 1.2em;
       }
     }
   }

   img {
     background-color: $color-base-orange;
     position: absolute;
     bottom: -18px;
     width: 100%;
   }
 }
</style>
