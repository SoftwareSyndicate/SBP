<template>
  <div class="profile-page">
    <div class="header">
      <h4 class="first-name">{{currentUser.attributes.firstName}}</h4>
      <h4 class="last-name">{{currentUser.attributes.lastName}}</h4>
      <p class="no-routes-message" v-if="sentRoutes.length == 0">No walls sent yet</p>
      <div class="base-stats" v-if="sentRoutes.length > 0">
        <div class="stat">
          Avg / Mo: <span>{{averageMonthly}}</span>
        </div>
        <div class="stat">
          Total Sent: <span>{{sentRoutes.length}}</span>
        </div>
        <div class="stat">
          Avg Grade: <span>{{averageGrade}}</span>
        </div>
      </div>
    </div>
    <div class="sent-history">
      <div class="sent-history-header">
        <h4>Sent History</h4>
        <div class="view-progress-button waves-effect waves-dark" v-link="{name: 'progress'}"  v-if="sentRoutes.length > 0">
          View progress
        </div>
      </div>
      <div class="no-routes-box" v-if="sentRoutes.length === 0">
        <p>Hey <span>{{currentUser.attributes.firstName}}</span>, lets record your first send!</p>
        <div class="view-walls-button waves-effect waves-light" v-link="{name: 'walls'}">
          View the walls
        </div>
      </div>
      <div class="routes-container component" v-if="sentRoutes.length > 0">
        <sent-route-table :routes="sentRoutes"></sent-route-table>
      </div>
    </div>
    <nav-tabs></nav-tabs>
  </div>
</template>

<script>
 import BaseComponent from '../../components/base/baseComponent.vue'
 import UserModel from '../../models/UserModel.js'
 import RouteModel from '../../models/RouteModel.js'
 import NavTabs from '../navTabs/navTabs.vue'
 import SentRouteTable from '../sentRouteTable/sentRouteTable.vue'

 var ProfilePage =  BaseComponent.extend({
   name: 'ProfilePage',
   components: {
     NavTabs,
     SentRouteTable
   },
   data(){
     return {
       currentUser: UserModel.currentUser,
       sentRoutes: RouteModel.sentRoutes,
       averageMonthly: 0,
       totalSent: 0,
       averageGrade: ""
     }
   },
   created(){
     this.calcAverageGrade();
     this.calcAverageMonthly();
     this.notifications.listenFor("RouteModel.sentRoutesUpdated", this.onSentRoutesUpdated, this);
   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "MY PROFILE");
     this.notifications.notify('GymPage.changeTab', 'none');
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
       this.calcAverageGrade();
       this.calcAverageMonthly();
     },
     calcAverageGrade(){
       var total = 0;
       this.sentRoutes.forEach(route => {
         total += parseInt(route.attributes.route.attributes.grade);
       });

       this.averageGrade = "v" + Math.round(total / this.sentRoutes.length);
     },
     calcAverageMonthly(){
       this.averageMonthly = this.sentRoutes.length;
     }
   }
 });

 export default ProfilePage;
</script>

<style lang="sass">
 @import "../../styles/main.scss";
 .profile-page {


   .header {
     background-color: white;
     padding-left: 16px;
     padding-right: 16px;
     padding-bottom: 2em;
     padding-top: 2em;
     display: flex;
     flex-wrap: wrap;

     h4 {
       font-size: 1.8em;
       font-weight: 300;
       color: $color-text-normal;
       text-transform: capitalize;
       margin-right: .3em !important;
       margin-bottom: .4em !important;
     }

     p {
       flex-basis: 100%;
       font-weight: 300;
       color: $color-text-normal;
     }

     .base-stats {
       display: flex;
       flex-grow: 1;
       border: 2px solid rgba(0, 0, 0, .1);
       justify-content: center;
       align-items: center;

       .stat {
         font-weight: bold;
         font-size: .8em;
         color: $color-text-light;
         justify-content: center;
         display: flex;
         padding: 1em;
         padding-top: 1.5em;
         padding-bottom: 1.5em;
         flex-grow: 1;
         border-right: 2px solid rgba(0, 0, 0, .1);

         span {
           padding-left: .3em;
           display: flex;
           color: $color-base-orange;
         }

         &:last-child {
           border: none;
         }
       }
     }
   }

   .sent-history {
     padding-left: 16px;
     padding-right: 16px;
     padding-bottom: 0em;
     padding-top: 3em;
     display: flex;
     flex-wrap: wrap;
     margin-bottom: 66px;

     .sent-history-header {
       display: flex;
       align-items: center;
       flex-grow: 1;
       padding-bottom: 1em !important;
       border-bottom: 1px solid rgba(0, 0, 0, .1);
       margin-bottom: 2em;

       h4 {
         font-size: 1.8em;
         font-weight: 300;
         color: $color-text-normal;
         text-transform: capitalize;
       }

       .view-progress-button {
         margin-left: auto;
         padding: .7em;
         padding-left: 1.2em;
         padding-right: 1.2em;
         color: $color-base-orange;
         border: 2px solid transparentize($color-base-orange, .3);
         border-radius: 3px;
         font-size: .8em;
         cursor: pointer;
       }
     }

     .no-routes-box {
       display: flex;
       flex-wrap: wrap;
       flex-grow: 1;
       background-color: white;
       padding-top: 4em;
       padding-bottom: 4em;
       text-align: center;

       p {
         font-size: 1.1em;
         color: $color-text-normal;
         flex-basis: 100%;
         margin-bottom: 1em !important;

         span {
           color: $color-text-normal;
           text-transform: capitalize;
         }
       }

       .view-walls-button {
         margin: auto;
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
   }
 }
</style>
