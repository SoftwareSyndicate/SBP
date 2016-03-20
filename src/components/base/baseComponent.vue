<script>
 import Vue from 'vue'
 import Notifications from '../../services/NotificationService.js'
 var BaseComponent = Vue.extend({
   name: 'BaseComponent',
   created(){
     // custom loading of declared notifications
     if(this.$options.notifs){
       for(let key in this.$options.notifs()){
         let f = this.$options.notifs()[key];
         Notifications.listenFor(key, this.$options.methods[f], this);
       }
     }
   },

   ready(){

   },

   data(){
     return {
       notifications:Notifications
     };
   },

   beforeDestroy(){
     // custom unloading of declared notifications
     if(this.$options.notifs){
       for(let key in this.$options.notifs()){
         let f = this.$options.notifs()[key];
         Notifications.removeListener(key, this.$options.methods[f]);
       }
     }
   },

   methods: {
     showLoadingAnimation(){
       Notifications.notify('Overlay.setVisible', true);
     },
     hideLoadingAnimation(){
       Notifications.notify('Overlay.setVisible', false);
     }
   }
 })

   export default BaseComponent
</script>
