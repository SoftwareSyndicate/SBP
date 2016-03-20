<template>
  <div class="gym-page">
    <ul class="tabs z-depth-1">
      <li class="tab col s3 z-depth-1" v-bind:class="{'active': gymTabVisible}" @click="changeTab('gym')">
        <a href="#tab-gym" class="">Gym</a>
      </li>
      <li class="tab col s3 z-depth-1" v-bind:class="{'active': distroTabVisible}" @click="changeTab('distro')">
        <a href="#tab-distro" class="">Distro</a>
      </li>
      <li class="tab col s3 z-depth-1" v-bind:class="{'active': infoTabVisible}" @click="changeTab('info')">
        <a href="#tab-info" class="">Info</a>
      </li>
    </ul>

    <div class="content-wrapper">
      <!-- Gym Tab -->
      <div id="tab-gym" class="col s12">
        <div class="stamp-container">
          <img src="/static/images/sbpStamp.png" class="sbpStamp">
        </div>

        <h4 class="routes-sent">
          Routes sent this Month
        </h4>

        <h3 class="routes-sent">
          {{routesSent}}
        </h3>
      </div>

      <!-- Distro Tab -->
      <div id="tab-distro" class="col s12">
        <div id="route-dist-container" v-if="routes.length > 0">
          <route-dist :routes="routes"></route-dist>
        </div>
        <div id="route-pie-chart-container" v-if="routes.length > 0">
          <route-pie-chart :routes="routes"></route-pie-chart>
        </div>
      </div>

      <!-- Info Tab -->
      <div id="tab-info" class="col s12">
        Gym info here

      </div>

    </div>


  </div>
</template>

<script>
 import RouteModel from '../../models/RouteModel.js'
 import RouteDist from '../routeDist/routeDist.vue'
 import RoutePieChart from '../routePieChart/routePieChart.vue'
 import BaseComponent from '../base/baseComponent.vue'
 var GymPage = BaseComponent.extend({
   name: 'GymPage',
   data(){
     return {
       routesSent: 546,
       gymTabVisible: true,
       infoTabVisible: false,
       distroTabVisible: false,
       routes: [],
     }
   },
   created(){
     setInterval(function(){
       this.routesSent++;
     }.bind(this), 1000);
     this.notifications.notify('Navbar.setHeader', "S.B.P");
     this.notifications.notify('Navbar.setActiveTab', "gym");
     this.hideLoadingAnimation();
   },
   ready(){
     $('ul.tabs').tabs();
     $("#wrapper").css("width", "100%");
   },
   components: {
     RouteDist,
     RoutePieChart
   },
   methods: {
     changeTab(tab){
       if(tab === "distro"){
         if(this.routes.length === 0){
           this.showLoadingAnimation();
           RouteModel.getRoutes().then(results => {
             this.routes = results;
             this.hideLoadingAnimation();
           });
         }
         this.distroTabVisible = true;
         this.gymTabVisible = false;
         this.infoTabVisible = false;
       } else if(tab === "gym"){
         this.distroTabVisible = false;
         this.gymTabVisible = true;
         this.infoTabVisible = false;
       } else if(tab === "info"){
         this.distroTabVisible = false;
         this.gymTabVisible = false;
         this.infoTabVisible = true;
       }
     }
   },

   beforeDestroy(){
     this.showLoadingAnimation();
     window.scrollTo(0, 0);
     $("#wrapper").css("width", "85%");
   }
 });

 export default GymPage
</script>

<style lang="sass">
 .gym-page {
   .tabs {
     margin-bottom: 1em;
     position: fixed;
     z-index: 2;

     li.tab {
       position: relative;
       float: none;

       &.active {
         box-shadow: none;
       }
     }
   }

   .content-wrapper {
     width: 85%;
     margin-left: 7.5%;
     margin-top: 60px;
   }

   .stamp-container {
     display: flex;
     margin-top: 2em;
     margin-bottom: 4em;

     img.sbpStamp {
       margin: auto;
       width: 15em;
       height: 16.5em;
     }
   }

   .routes-sent {
     font-weight: lighter;
     text-align: center;
   }

   #route-dist-container {

   }

   #route-pie-chart-container {
     height: 40vh;
   }
 }

</style>
