<template>
  <div class="sign-up-page">
    <div class="sign-up-nav" v-if="navVisible">
      <div class="left-container">
        <i class="material-icons" @click="onLeftClick()">arrow_back</i>
      </div>
      <div class="center-container">

      </div>
      <div class="right-container">
        <span @click="onRightClick()">{{rightText}}</span>
      </div>
    </div>
    <router-view :parent="this" class="sign-up-page-form"></router-view>
    <div class="footer-container" v-if="$route.name==='intro'">
      <p class="headline">
        Start tracking your progress at the Seattle Bouldering Project
      </p>
      <button v-link="{name: 'name'}" class="sign-up-button" type="button" name="button">Sign up today</button>
      <p class="have-account" v-link="{name: 'signIn'}">I already have an account</p>
    </div>
  </div>
</template>

<script>
import BaseComponent from '../../RMS/src/components/base/baseComponent.vue'
import UserModel from '../../RMS/src/models/UserModel.js'

var SignUpPage = BaseComponent.extend({
  name: 'SignUpPage',
  data(){
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      error: false,
      navVisible: false,
      rightText: 'Next'
    }
  },
  created(){
    if(UserModel.currentUser){
      this.$router.go({name: 'profile'});
    }
    this.hideLoadingAnimation();
  },
  ready(){
    this.notifications.notify('Navbar.setHeader', "Seattle Bouldering Project");
    this.notifications.notify('Navbar.setVisible', false);
    $('.sign-up-page').css("height", document.body.clientHeight + "px");
  },
  events: {
    setNavHeaderVisible(visible){
      this.navVisible = visible;
    },
    'nav-set-right-text': function(text){
      this.rightText = text;
    }
  },
  methods: {
    onRightClick(){
      this.$broadcast('nav-right-click');
    },
    onLeftClick(){
      this.$broadcast('nav-left-click');
    }
  },

  beforeDestroy(){
    window.scrollTo(0, 0);
  }
});

export default SignUpPage;
</script>

<style lang="scss">
@import '~styles/main.scss';

.sign-up-page {
  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
  flex-direction: column;
  height: 100%;
  background: $gradient-background;

  .sign-up-nav {
    background-color: $color-orange-1;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    position: absolute;
    top: 0px;
    left: 0px;

    span,
    .material-icons {
      color: white;
    }

    & + .sign-up-page-form {
      margin-top: 50px;
    }
  }

  .footer-container {
    display: flex;
    position: fixed;
    z-index: 2;
    bottom: 0px;
    height: 200px;
    width: 100%;
    background-color: $color-orange-2;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 60px;
    p {
      margin-top: auto;
      margin-bottom: 10px;
      font-size: .9em;
      font-weight: 300;
      color: rgba(255, 255, 255, .9);

      &.headline {
        font-size: 1.2em;
        text-align: center;
      }
      &.have-account {
        margin-bottom: 20px;
      }
    }

    .sign-up-button {
      background-color: darken($color-orange-1, 10);
      border-bottom: 3px solid darken($color-orange-1, 20);
      width: 100%;
      color: white;
    }
  }
  //  img {
  //    width: 100%;
  //    position: absolute;
  //    bottom: 32px;
  //  }
}

</style>
