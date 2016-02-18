import $ from 'jquery'
import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import LoginPage from './components/pages/loginPage.vue'

// install router
Vue.use(Router)

// routing
var router = new Router()

router.map({
  '/login': {
    component: LoginPage
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/login'
})

router.start(App, '#app')
