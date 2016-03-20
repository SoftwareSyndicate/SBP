import Parse from './services/ParseService.js'
import Vue from 'vue'
import filters from './filters/filters.js'
import Router from 'vue-router'
import App from './components/App.vue'
import GymPage from './components/pages/gymPage.vue'
import WallsPage from './components/pages/wallsPage.vue'
import WallPage from './components/pages/wallPage.vue'
import RoutesPage from './components/pages/routesPage.vue'
import RoutePage from './components/pages/routePage.vue'
import UserPage from './components/pages/userPage.vue'

// install router
Vue.use(Router);

// routing
var router = new Router();

router.map({
  //Gym
  '/gym': {
    name: 'gym',
    component: GymPage
  },
  //Wall List
  '/walls': {
    name: 'wallList',
    component: WallsPage
  },
  //Wall
  '/walls/:wallId': {
    name: 'wall',
    component: WallPage
  },
  //Routes
  '/routes': {
    name: 'routes',
    component: RoutesPage
  },
  //Route
  '/routes/:routeId': {
    name: 'route',
    component: RoutePage
  },
  //User
  '/stats': {
    name: 'stats',
    component: UserPage
  }

});

router.beforeEach(function () {
  window.scrollTo(0, 0)
});

router.redirect({
  '*': '/gym'
});

router.start(App, '#app');
