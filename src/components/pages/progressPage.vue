<template>
  <div class="progress-page">
    <div class="routes-over-time-chart-container component">
      <div class="chart-header">
        <p>Routes Sent Over Time</p>
      </div>
      <routes-over-time-chart :routes="sentRoutes"  v-if="true"></routes-over-time-chart>
    </div>
    <div class="routes-over-time-chart-container component">
      <div class="chart-header">
        <p>Avg V-Grade Over Time</p>
      </div>
      <grade-over-time-chart :routes="sentRoutes"  v-if="true"></grade-over-time-chart>
    </div>
  </div>
  <nav-tabs></nav-tabs>
</template>
<script>
 import BaseComponent from '../../components/base/baseComponent.vue'
 import UserModel from '../../models/UserModel.js'
 import RouteModel from '../../models/RouteModel.js'
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
     this.notifications.listenFor("RouteModel.sentRoutesUpdated", this.onSentRoutesUpdated, this);
   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "MY PROGRESS");
     this.notifications.notify('NavTabs.setActiveTab', 'profile');
     this.hideLoadingAnimation();
   },
   beforeDestroy(){
     this.notifications.removeListener("RouteModel.sentRoutesUpdated", this.onSentRoutesUpdated);
     window.scrollTo(0, 0);
   },
   methods: {
     onSentRoutesUpdated(){
       this.sentRoutes = RouteModel.sentRoutes;
     }
   }
 });

 export default ProgressPage;
</script>

<style lang="sass">
 @import "../../styles/main.scss";
 .progress-page {
   padding: 16px;

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
