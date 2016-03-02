<template>
  <div class="navbar-fixed" id="navbar">
    <div class="nav-wrapper">
      <nav class="blue">
        <a href="#!" class="brand-logo center">{{header}}</a>
        <ul class="right hide-on-med-and-down">
          <li><a class="waves-effect waves-light" href="#!/gym">Gym</a></li>
          <li><a class="waves-effect waves-light" href="#!/walls">Walls</a></li>
          <li><a class="waves-effect waves-light" href="#!/routes">Routes</a></li>
          <li><a v-on:click="openLoginModal" class="waves-effect waves-light" href="#loginModal">Login</a></li>
        </ul>
        <ul id="slide-out" class="side-nav">
          <div class="nav-brand"></div>
          <li><a class="waves-effect waves-light" href="#!/gym">Gym</a></li>
          <li><a href="#!/walls">Walls</a></li>
          <li><a href="#!/routes">Routes</a></li>
          <li v-on:click="openLoginModal"><a>Login</a></li>
        </ul>
        <a data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>
      </nav>
    </div>
  </div>
</template>

<script>
  import notifications from '../../services/NotificationService';

  export default {
    name: 'Navbar',
    props: ['header'],
    el: '#navbar',
    ready(){
      $('.button-collapse').sideNav({
        menuWidth: 280,
        closeOnClick: true
      });
      notifications.listenFor('Navbar.setHeader', this.setHeader, this);
    },
    methods: {
      openLoginModal: function(event){
        $('#loginModal').openModal();
      },
      setHeader(event, newHeader){
        this.header = newHeader;
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
