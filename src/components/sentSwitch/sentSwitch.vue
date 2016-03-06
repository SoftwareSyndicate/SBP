<template>
  <div class="sent-switch" @click.stop="">
    <div class="switch">
      <label>
        <input type="checkbox" v-model="route.attributes.sent"  @click.stop="flipSwitch">
        <span class="lever"></span>
      </label>
    </div>
  </div>
</template>

<script>
 import RouteModel from '../../models/RouteModel.js'
 import UserModel from '../../models/UserModel.js'
 export default {
   name: 'SentSwitch',
   props: ['route'],
   data(){
     return {
       switchFlipped: true
     }
   },
   created(){

   },

   methods: {
     flipSwitch(){
       if(this.route.attributes.sent){
         RouteModel.sendRoute(this.route, UserModel.currentUser).then(results => {
           console.log(results);
         });
       }
     }
   }
 }
</script>

<style lang="sass">
 .sent-switch {

 }
</style>
