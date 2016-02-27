<template>
  <div class="navbar-fixed">
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
          <li v-on:click="openLoginModal"><a href="#loginModal">Login</a></li>
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
    notifications.listenFor('update-navbar-header', this.onUpdateNavbar, this);
    //  this.$on('update-navbar-header', this.onUpdateNavbar);
  },
  methods: {
    openLoginModal: function(event){
      $('#loginModal').openModal();
    },
    onUpdateNavbar: function(){
      console.log('on update:',arguments);
    }
  },
  events: {
    'update-navbar-header': function(){
      console.log(arguments);
    }
  }
  }
  </script>

  <style lang="sass">
  nav {
    .nav-brand {
      height: 10em;
      background-image: url("/static/images/sbp_navbar.png");
      background-size: cover;
    }

    @media (max-width: 990px){
      li {
        padding: 0px !important;
      }
    }
  }
</style>
