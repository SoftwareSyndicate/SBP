require('file?name=[name].[ext]!../index.html'); // copy the index.html file

import {default as $} from 'jquery'

window.$ = $;

import d3 from 'd3'
import Vue from 'vue'
import filters from './filters/filters.js'
import Router from 'vue-router'
import App from './components/App.vue'
import GymPage from './components/pages/gymPage.vue'
import GymLayoutPage from './components/pages/gymLayoutPage.vue'
import GymInfoPage from './components/pages/gymInfoPage.vue'
import WallsPage from './components/pages/wallsPage.vue'
import NewsPage from './components/pages/newsPage.vue'
import WallPage from './components/pages/wallPage.vue'
import NavPage from './components/pages/navPage.vue'
import ProfilePage from './components/pages/profilePage.vue'
import ProgressPage from './components/pages/progressPage.vue'
import Notifications from './RMS/src/services/NotificationService.js'
import UserModel from './RMS/src/models/UserModel.js'

//Sign In
import SignInPage from './components/pages/signInPage.vue'

//Sign Up
import SignUpPage from './components/pages/signUpPage.vue'
import IntroForm from './components/signUp/introForm.vue'
import EmailForm from './components/signUp/emailForm.vue'
import NameForm from './components/signUp/nameForm.vue'


import chartJS from 'chart.js'
window.chartJS = chartJS;

Chart.defaults.global.elements.line.borderWidth = 2;
Chart.defaults.global.elements.arc.borderWidth = 2;
Chart.defaults.global.elements.point.radius = 0;
Chart.defaults.global.title.display = false;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.animation.duration = 1800;

import nvd3 from './libs/nvd3.js'
import stream_layers from './libs/streamLayers.js'


window.gymId = "-KLi8WWAMzuH1k4mlkbj";

window.colorMappings = {
  gray: "rgba(209,209,209, 0.8)",
  yellow: "rgba(255,210,28, 0.8)",
  green: "rgba(5,179,99, 0.9)",
  red: "rgba(243,23,38, 0.8)",
  blue: "rgba(48,99,245, 0.8)",
  orange: "rgba(252,109,33, 0.8)",
  purple: "rgba(183,22,229,0.8)",
  black: "rgba(33,33,33,0.9)"
}

window.colorsArray = ['Gray','Yellow','Green','Red','Blue','Orange','Purple','Black'];
window.gradesArray = ['v0','v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12'];

// install router
Vue.use(Router);

// routing
var router = new Router();

router.map({
  //Gym
  '/gym': {
    name: 'gym',
    component: GymPage,
    subRoutes: {
      '/': {
        name: 'walls',
        component: WallsPage
      },
      '/walls': {
        name: 'walls',
        component: WallsPage
      },
      '/walls/:id': {
        name: 'wall',
        component: WallPage
      },
      '/layout': {
        name: 'layout',
        component: GymLayoutPage
      },
      '/menu': {
        name: 'menu',
        component: NavPage
      },
      '/info': {
        name: 'info',
        component: GymInfoPage
      },
      '/news': {
        name: 'news',
        component: NewsPage
      }
    }
  },

  //Users
  '/profile': {
    name: 'profile',
    component: ProfilePage
  },

  '/progress': {
    name: 'progress',
    component: ProgressPage
  },

  //Sign In
  '/signIn': {
    name: 'signIn',
    component: SignInPage
  },

  //Sign Up
  '/signUp': {
    name: 'signUp',
    component: SignUpPage,
    subRoutes: {
      '/intro': {
        name: 'intro',
        component: IntroForm
      },
      '/name': {
        name: 'name',
        component: NameForm
      },
      '/email': {
        name: 'email',
        component: EmailForm
      }
    }
  }
});

router.beforeEach(function(transition){
  if(!UserModel.currentUser){
    transition.redirect("/signIn");
  } else {
    Notifications.notify('Router.beforeTransition', transition);
    transition.next();
  }
});

router.redirect({
  '*': '/gym/walls'
});

router.redirect({
  '/signUp': '/signUp/intro'
});

window.onInputFocused = function(){
  Notifications.notify("Input.focused");
}

window.onInputBlured = function(){
  Notifications.notify("Input.blured");
}

let loaded = false;
firebase.auth().onAuthStateChanged(user => {
  if(!loaded){
    router.start(App, '#app');
    loaded = true;
  }
});

