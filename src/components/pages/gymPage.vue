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
          <img src="../../../images/sbp_stamp.png" class="sbpStamp">
        </div>

        <div class="routes-sent">
          <h5>
            Fresh Boulders every
          </h5>
          <br>
          <h5 v-bind:class="{'current-day': highlightTuesday}">
            Tuesday
          </h5>
          <h5 v-bind:class="{'current-day': highlightThursday}">
            Thursday
          </h5>
        </div>

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

        <div class="panel-container">
          <div class="card-panel blue">
            <h6>Location</h6>
            <div class="col s12 hour-container">
              <span>Seattle Bouldering Project<br>
                900 Poplar Pl S
                Seattle, WA 98144
              </span>
            </div>
          </div>

          <div class="panel-container">
            <div class="card-panel blue">
              <h6>Hours</h6>
              <div class="col s12 hour-container">
                <span>Mon - Fri:</span><span class="time"> 6:00am – 11:00pm</span>
              </div>
              <div class="col s12 hour-container">
                <span>Sat - Sun:</span><span class="time"> 9:00am – 10:00pm</span>
              </div>
            </div>

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
       highlightTuesday: false,
       highlightThursday: false,
       routes: [],
     }
   },
   created(){
     var now = new Date();
     if(now.toDateString().split(" ")[0] === "Tue"){
       this.highlightTuesday = true;
     } else if (now.toDateString().split(" ")[0] === "Thu"){
       this.highlightThursday = true;
     }
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
     margin-top: 4em;
     padding-top: 4em;
     margin-bottom: 4em;

     img.sbpStamp {
       margin-left: auto;
       margin-right: auto;
       height: 13em;
     }
   }

   .routes-sent {
     text-align: center;
     h5 {
       font-weight: lighter;
       display: inline-block;

       &.current-day {
         color: #FF0000;
       }
     }
   }

   #route-dist-container {

   }

   #route-pie-chart-container {
     height: 40vh;
   }

   .panel-container {
     display: flex;
     flex-grow: 1;
     flex-direction: column;
     .card-panel {
       flex-grow: 1;
       display: flex;
       flex-direction: column;
     }
     h6 {
       display: flex;
       flex-grow: 1;
       color: white;
       font-size: 1.2em;
       font-weight: 100;
       text-decoration: underline;
     }

     span {
       font-weight: 100;
       color: white;
       align-items: center;
       &.time {
         margin-left: auto;
       }
     }

     .hour-container {
       display: flex;
     }
   }
 }

</style>
