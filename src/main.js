require('file?name=[name].[ext]!../index.html'); // copy the index.html file
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* var app = {
   // Application Constructor
   initialize: function() {
   this.bindEvents();
   },
   // Bind Event Listeners
   //
   // Bind any events that are required on startup. Common events are:
   // 'load', 'deviceready', 'offline', and 'online'.
   bindEvents: function() {
   document.addEventListener('app', this.onDeviceReady, false);
   },
   // deviceready Event Handler
   //
   // The scope of 'this' is the event. In order to call the 'receivedEvent'
   // function, we must explicitly call 'app.receivedEvent(...);'
   onDeviceReady: function() {
   app.receivedEvent('app');
   },
   // Update DOM on a Received Event
   receivedEvent: function(id) {
   var parentElement = document.getElementById(id);
   var listeningElement = parentElement.querySelector('.listening');
   var receivedElement = parentElement.querySelector('.received');

   listeningElement.setAttribute('style', 'display:none;');
   receivedElement.setAttribute('style', 'display:block;');

   console.log('Received Event: ' + id);
   }
   };

   app.initialize();
 */


import d3 from 'd3'
import Parse from './services/ParseService.js'
import Vue from 'vue'
import filters from './filters/filters.js'
import Router from 'vue-router'
import App from './components/App.vue'
import GymPage from './components/pages/gymPage.vue'
import GymLayoutPage from './components/pages/gymLayoutPage.vue'
import WallsPage from './components/pages/wallsPage.vue'
import WallPage from './components/pages/wallPage.vue'
import RoutesPage from './components/pages/routesPage.vue'
import RoutePage from './components/pages/routePage.vue'
import NavPage from './components/pages/navPage.vue'
import UserPage from './components/pages/userPage.vue'
import nvd3 from './libs/nvd3.js'
import stream_layers from './libs/streamLayers.js'

window.colorMappings = {
  gray: "#95a5a6",
  yellow: "#ffeb3b",
  green: "#4caf50",
  red: "#f44336",
  blue: "#2196f3",
  orange: "#ff9800",
  purple: "#9c27b0",
  black: "#212121"
}

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
      '/walls/:wallId': {
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
      }
    }
  }
});

router.beforeEach(function () {
  window.scrollTo(0, 0)
});

router.redirect({
  '*': '/gym'
});

router.start(App, '#app');
