<template>
  <div>
    <div class="progress-page">
      <div class="need-more-routes component" v-if="sentRoutes.length < 2">
        You must send at least 2 routes before progress can be generated
        <div class="view-walls-button waves-effect waves-light" v-link="{name: 'walls'}">
          View the walls
        </div>
      </div>
      <div class="routes-over-time-chart-container component" v-if="sentRoutes.length > 1">
        <div class="chart-header">
          <p>Routes Sent Over Time</p>
        </div>
        <routes-over-time-chart :routes="sentRoutes"  v-if="true"></routes-over-time-chart>
      </div>
      <div class="routes-over-time-chart-container component" v-if="sentRoutes.length > 1">
        <div class="chart-header">
          <p>Avg V-Grade Over Time</p>
        </div>
        <grade-over-time-chart :routes="sentRoutes"  v-if="true"></grade-over-time-chart>
      </div>
    </div>
    <nav-tabs></nav-tabs>
  </div>
</template>
<script>
 import BaseComponent from '../../RMS/src/components/base/baseComponent.vue'
 import UserModel from '../../RMS/src/models/UserModel.js'
 import RouteModel from '../../RMS/src/models/RouteModel.js'
 import SentRouteModel from '../../RMS/src/models/SentRouteModel.js'

 import NavTabs from '../navTabs/navTabs.vue'
 import RoutesOverTimeChart from '../routesOverTimeChart/routesOverTimeChart.vue'
 import GradeOverTimeChart from '../gradeOverTimeChart/gradeOverTimeChart.vue'

 var ProgressPage =  BaseComponent.extend({
   name: 'ProgressPage',
   components: {
     NavTabs,
     RoutesOverTimeChart,
     GradeOverTimeChart
   },
   data(){
     return {
       currentUser: UserModel.currentUser,
       sentRoutes: RouteModel.sentRoutes
     }
   },
   created(){
     this.parseRoutes();
   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "MY PROGRESS");
     this.notifications.notify('NavTabs.setActiveTab', 'profile');
     this.hideLoadingAnimation();
   },
   notifs(){
     return {
       'RouteModel.routesUpdated': 'parseRoutes',
       'SentRouteModel.routesUpdated': 'parseRoutes'
     }
   },
   methods: {
     parseRoutes(){
       this.sentRoutes = [];
       RouteModel.routes.forEach(route => {
         SentRouteModel.routes.forEach(sentRoute => {
           if(route.id === sentRoute.route_id){
             route.created_at = sentRoute.created_at;
             this.sentRoutes.push(route);
           }
         });
       });
       console.log(this.sentRoutes);
     },
   }
 });

 export default ProgressPage;
</script>

<style lang="scss">
 @import "../../styles/main.scss";
 .progress-page {
   padding: 16px;

   .need-more-routes {
     display: flex;
     flex-wrap: wrap;
     margin-top: 3em;
     padding: 1em;
     text-align: center;

     .view-walls-button {
       flex-basis: 100%;
       margin: auto;
       margin-top: 2em;
       padding: .7em;
       padding-left: 1.2em;
       padding-right: 1.2em;
       color: white;
       background-color: $color-base-orange;
       border-radius: 3px;
       font-size: .8em;
       cursor: pointer;
     }
   }

   .routes-over-time-chart-container {
     display: flex;
     flex-grow: 1;
     flex-wrap: wrap;
     margin: auto;
     padding-bottom: 4em;
     margin-bottom: 2em;
     height: 40vh;
     flex-basis: 100%;
   }

   .chart-header {
     margin-bottom: 1em;
     padding: 1em;
     flex-basis: 100%;
     font-size: .9em;
     font-weight: bold;
     color: rgba(0, 0, 0, .5) !important;
     border-bottom: $component-border;
   }
 }
</style>
