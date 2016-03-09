<template>
  <div class="route-page">
    <div class="grade-image-container" v-if="route.attributes">
      <img :src="'/static/images/grades/' + route.attributes.gradeImage + '.png'" alt="" class="grade">
    </div>

    <div class="route-rating-container">
      <route-rating :route="route"></route-rating>
    </div>

    <!-- <div class="sent-switch-container">
         <p>Route Sent:</p>
         <sent-switch :route="route" v-if="route.attributes"></sent-switch>
         </div> -->

    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <textarea id="textarea1" class="materialize-textarea"></textarea>
            <label for="textarea1">Feedback</label>
          </div>
        </div>
      </form>
    </div>



  </div>
</template>

<script>
 import RouteModel from '../../models/RouteModel.js'
 import RouteRating from '../../components/routeRating/routeRating.vue'
 import SentSwitch from '../../components/sentSwitch/sentSwitch.vue'
 import notifications from '../../services/NotificationService.js'
 export default {
   name: 'RoutePage',
   components: {
     RouteRating,
     SentSwitch
   },
   data(){
     return {
       route: {}
     }
   },
   created(){
     var routeId = window.location.href.split("/")[window.location.href.split("/").length - 1];
     RouteModel.getRouteById(routeId).then(results => {
       this.route = results;
       console.log(this.route);
       var header = results.attributes.wall.attributes.name + "  v" + results.attributes.grade;
       notifications.notify('Navbar.setHeader', header);
       notifications.notify('Overlay.setVisible', false);
     }, function(error){
       notifications.notify('Overlay.setVisible', false);
     }.bind(this));
   },

   beforeDestroy(){
     notifications.notify('Overlay.setVisible', true);
     window.scrollTo(0, 0);
   },

 };
</script>

<style lang="sass">
 .route-page {
   .grade-image-container {
     margin-bottom: 3em;
     padding: 16px;
     display: flex;
     justify-content: center;
     img {
       height: 10em;
       width: 10em;
     }
   }

   .route-rating-container {
     display: flex;
     justify-content: center;
     margin-bottom: 4em;
   }

   .sent-switch-container {
     display: flex;
     justify-content: center;
     align-items: center;
   }
 }

</style>
