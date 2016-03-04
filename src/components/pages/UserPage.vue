<template>
  <div class="user-page">
    <div class="row">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s3"><a href="#tab-info" class="#active">Info</a></li>
          <li class="tab col s3"><a href="#tab-distro">Distro</a></li>
          <li class="tab col s3"><a href="#tab-sent">Sent</a></li>
        </ul>
      </div>
      <div id="tab-info" class="col s12">Test 1</div>
      <div id="tab-distro" class="col s12">Test 2</div>
      <div id="tab-sent" class="col s12">Test 3</div>
    </div>
  </div>
</template>
<script>
 import WallModel from '../../models/WallModel.js';
 import notifications from '../../services/NotificationService';

 export default {
   name: 'UserPage',
   data(){
     return {

     }
   },
   ready(){
     notifications.notify('Navbar.setHeader', "Stats");
     notifications.notify('Overlay.setVisible', false);
     $('ul.tabs').tabs();
   },
   components: {

   },

   methods: {

   },

   beforeDestroy(){
     notifications.notify('Overlay.setVisible', true);
   }

 };
</script>

<style lang="sass">
 .user-page {
   
 }
</style>
