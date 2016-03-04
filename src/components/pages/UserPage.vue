<template>
  <div class="user-page">
    <ul class="tabs z-depth-1">
      <li class="tab col s3" v-bind:class="{'z-depth-1': !infoTabVisible}" @click="changeTab('info')"><a href="#tab-info" class="#active">Info</a></li>
      <li class="tab col s3" v-bind:class="{'z-depth-1': !distroTabVisible}" @click="changeTab('distro')"><a href="#tab-distro">Distro</a></li>
      <li class="tab col s3" v-bind:class="{'z-depth-1': !sentTabVisible}" @click="changeTab('sent')"><a href="#tab-sent">Sent</a></li>
    </ul>

    <div class="content-wrapper">
      <!-- Info Tab -->
      <div id="tab-info" class="col s12">

      </div>
      <!-- Distro Tab -->
      <div id="tab-distro" class="col s12">distro</div>
      <!-- Sent Tab -->
      <div id="tab-sent" class="col s12">
        <route-list :routes="sentRoutes" :display-keys="routeKeys"></route-list>
      </div>
    </div>
  </div>
</template>
<script>
 import WallModel from '../../models/WallModel.js';
 import RouteList from '../routeList/routeList.vue'
 import RouteModel from '../../models/RouteModel.js';
 import notifications from '../../services/NotificationService';
 export default {
   name: 'UserPage',
   data(){
     return {
       infoTabVisible: true,
       distroTabVisible: false,
       sentTabVisible: false,
       sentRoutes: [],
       routeKeys: ['grade', 'wall', 'sends']
     }
   },
   ready(){
     notifications.notify('Navbar.setHeader', "Stats");
     $('ul.tabs').tabs();

     $("#wrapper").css("width", "100%");

     RouteModel.getRoutes().then(results => {
       this.sentRoutes = results;
       notifications.notify('Overlay.setVisible', false);
     });
   },
   components: {
     RouteList
   },

   methods: {
     changeTab(tab){
       console.log("change tab", tab);
       if(tab === "info"){
         this.infoTabVisible = true;
         this.distroTabVisible = false;
         this.sentTabVisible = false;
       } else if(tab === "distro"){
         this.infoTabVisible = false;
         this.distroTabVisible = true;
         this.sentTabVisible = false;
       } else if(tab === "sent"){
         this.infoTabVisible = false;
         this.distroTabVisible = false;
         this.sentTabVisible = true;
       }
     },
   },

   beforeDestroy(){
     notifications.notify('Overlay.setVisible', true);
     $("#wrapper").css("width", "85%");
   }

 };
</script>

<style lang="sass">
 .user-page {

   .tabs {
     margin-bottom: 1em;
   }

   .content-wrapper {
     width: 85%;
     margin-left: 7.5%;
   }
 }
</style>
