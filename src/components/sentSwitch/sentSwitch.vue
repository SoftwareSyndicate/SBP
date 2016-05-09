<template>
  <div class="sent-switch" @click.stop="flipSwitch()">
    <div class="wrap">
      <div class="toggle">
	<input type="checkbox" v-bind:checked="sent">
	<span class="btn"></span>
	<span class="texts"></span>
	<span class="bg"></span>
      </div>
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
       sent: false
     }
   },
   created(){
     this.initState = false;
     RouteModel.sentRoutes.forEach(sentRoute => {
       if(sentRoute.attributes.route.id === this.route.id){
         this.sent = true;
         this.initState = true;
       }
     });
   },

   methods: {
     flipSwitch(){
       this.sent = !this.sent;
     }
   },
   beforeDestroy(){
     if(this.initState != this.sent){
       console.log("sentSwitch.beforeDestroy()");
       var routeToBeUpdated = {
         id: this.route.id,
         sent: this.sent
       };

       var routesToBeUpdated = JSON.parse(localStorage.getItem("routesToBeUpdated"));
       routesToBeUpdated.push(routeToBeUpdated);
       localStorage.setItem("routesToBeUpdated", JSON.stringify(routesToBeUpdated));
       console.log(JSON.parse(localStorage.getItem("routesToBeUpdated")));
     }
   }
 }
</script>

<style lang="sass">
 @import '../../styles/main.scss';

 .sent-switch {
   .wrap {
     width: 90px;
   }

   .toggle {
     position: relative;
     width: 82px;
     height: 35px;
     border: 3px solid #f9f9f9;
     border-radius: 40px;
   }

   .toggle input[type="checkbox"] {
     opacity: 0;
     cursor: pointer;
     position: absolute;
     top: 0;
     left: 0;
     z-index: 10;
     width: 84px;
     height: 34px;
   }

   .toggle .btn {
     display: block;
     position: absolute;
     z-index: 4;
     top: 2px;
     left: 3px;
     width: 24px;
     height: 24px;
     background: #F5F5F5;
     border: 1px solid #e8e8e8;
     border-radius: 100%;
     box-shadow: 0 2px 4px rgba(100, 100, 100, 0.1);
     transition: left .25s ease-in-out;
   }

   .toggle input[type="checkbox"]:checked ~ .btn {
     left: 46px;
   }

   .toggle .texts {
     position: absolute;
     top: 9px;
     z-index: 2;
     width: 100%;
     font-family: 'Lato', Helvetica, sans-serif;
     font-weight: bold;
     color: #fff;
     text-transform: uppercase;
     font-size: 14px;
   }

   .toggle .texts:before {
     /* content: '\01F44D'; */
     position: absolute;
     font-size: 12px;
     left: 12px;
     z-index: 100
   }
   ​
   .toggle .texts:after {
     /* content: '\01F44D'; */
     position: absolute;
     right: 11px;
   }

   .toggle .bg {
     display: block;
     background: #d9ddec;
     position: absolute;
     z-index: 0;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     border-radius: 40px;
     box-shadow: inset 0 0px 2px 1px rgba(0, 0, 0, 0.3);
     transition: background .25s ease-in;
   }

   .toggle input[type="checkbox"]:checked ~ .bg {
     background: $color-base-orange;
   }

   * {
     margin: 0;
     padding: 0;
   }
 }
</style>
