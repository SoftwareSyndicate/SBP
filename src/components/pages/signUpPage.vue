<template>
  <div class="sign-up-page">
    <router-view></router-view>
  </div>
</template>

<script>
 import BaseComponent from '../base/baseComponent.vue'
 import UserModel from '../../models/UserModel.js'

 var SignUpPage = BaseComponent.extend({
   name: 'SignUpPage',
   data(){
     return {
       email: "",
       password: "",
       firstName: "",
       lastName: "",
       error: false
     }
   },
   created(){
     if(UserModel.currentUser){
       this.$router.go({name: 'layout'});
     }
     this.hideLoadingAnimation();
   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "Seattle Bouldering Project");
     this.notifications.notify('Navbar.setVisible', false);
   },
   methods: {

   },

   beforeDestroy(){
     this.showLoadingAnimation();
     window.scrollTo(0, 0);
   }
 });

 export default SignUpPage;
</script>

<style lang="sass">
 @import '../../styles/main.scss';

 .sign-up-page {
   display: flex;
   flex-wrap: wrap;
   flex-basis: 100%;
   flex-direction: column;
   height: 100%;
   background-color: lighten($color-base-orange, 3%);

 }

</style>
