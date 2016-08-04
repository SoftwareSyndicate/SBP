<template>
  <div class="sent-switch">
    <p>
      <input type="checkbox" id="sent-switch-checkbox-{{route.id}}" v-model="checked" @click="toggle()"/>
      <label for="sent-switch-checkbox-{{route.id}}"></label>
    </p>
  </div>

</template>

<script>
 import SentRouteModel from '../../RMS/src/models/SentRouteModel'
 import UserModel from '../../RMS/src/models/UserModel'
 export default {
   name: 'SentSwitch',
   props: {
     route: {
       type: Object,
       default: {}
     }
   },
   data(){
     return {
       checked: false
     }
   },
   created(){
     this.$watch('route', val => {
       this.checked = this.route.sent;
     }, {
       deep: true,
       immediate: true
     });

   },
   methods:{
     toggle(){
       if(!this.route.sent){
         SentRouteModel.createSentRoute(this.route.id, UserModel.currentUser.id);
       } else {
         SentRouteModel.routes.forEach(sentRoute => {
           if(sentRoute.route_id == this.route.id){
             SentRouteModel.deleteSentRoute(sentRoute.id);
           }
         });
       }
     }
   },
   beforeDestroy(){

   }
 }
</script>

<style lang="scss">
 @import '../../styles/main.scss';

 .sent-switch {

 }


</style>
