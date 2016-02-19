import $ from 'jquery'
import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import GymPage from './components/pages/gymPage.vue'
import WallsPage from './components/pages/wallsPage.vue'

// install router
Vue.use(Router);

// routing
var router = new Router();

router.map({
  '/gym': {
    component: GymPage
  },
  '/walls': {
    component: WallsPage
  }
});

router.beforeEach(function () {
  window.scrollTo(0, 0)
});

router.redirect({
  '*': '/gym'
});

router.start(App, '#app');
