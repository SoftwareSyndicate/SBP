<template>
  <div class="overlay-container" v-show="visible">
    <div class="ball"></div>
    <div class="ball"></div>
    <div class="ball"></div>
    <div class="ball"></div>
    <div class="ball"></div>
    <div class="ball"></div>
    <div class="ball"></div>
    <div class="ball"></div>
  </div>
</template>

<script>
 import notifications from '../../services/NotificationService.js'
 export default {
   name: 'Overlay',
   data(){
     return {
       visible: true
     }
   },
   created(){
     notifications.listenFor('Overlay.setVisible', this.setVisible, this);
   },
   methods: {
     setVisible(event, visible){
       this.visible = visible;
     }

   }
 }
</script>

<style lang="sass">
 .overlay-container {
   width: 100vw;
   height: 100vh;
   padding-top: 20vh;
   margin: 0 auto;
 }

 .ball {
   width: 10px;
   height: 10px;
   margin: 10px auto;
   border-radius: 50px;
 }
 .ball:nth-child(1) {
   background: #95a5a6;
   -webkit-animation: right 1s infinite ease-in-out;
   -moz-animation: right 1s infinite ease-in-out;
   animation: right 1s infinite ease-in-out;    
 }

 .ball:nth-child(2) {
   background: #ffeb3b;
   -webkit-animation: left 1.1s infinite ease-in-out;
   -moz-animation: left 1.1s infinite ease-in-out;
   animation: left 1.1s infinite ease-in-out;
 }

 .ball:nth-child(3) {
   background: #4caf50;
   -webkit-animation: right 1.05s infinite ease-in-out;
   -moz-animation: right 1.05s infinite ease-in-out;
   animation: right 1.05s infinite ease-in-out;
 }

 .ball:nth-child(4) {
   background: #f44336;
   -webkit-animation: left 1.15s infinite ease-in-out;
   -moz-animation: left 1.15s infinite ease-in-out;
   animation: left 1.15s infinite ease-in-out;
 }

 .ball:nth-child(5) {
   background: #2196f3;
   -webkit-animation: right 1.1s infinite ease-in-out;
   -moz-animation: right 1.1s infinite ease-in-out;
   animation: right 1.1s infinite ease-in-out;
 }

 .ball:nth-child(6) {
   background: #ff9800;
   -webkit-animation: left 1.05s infinite ease-in-out;
   -moz-animation: left 1.05s infinite ease-in-out;
   animation: left 1.05s infinite ease-in-out;
 }

 .ball:nth-child(7) {
   background: #9c27b0;
   -webkit-animation: right 1s infinite ease-in-out;
   -moz-animation: right 1s infinite ease-in-out;
   animation: right 1s infinite ease-in-out;
 }

 .ball:nth-child(8) {
   background: #212121;
   -webkit-animation: right 1.15s infinite ease-in-out;
   -moz-animation: right 1.15s infinite ease-in-out;
   animation: right 1.15s infinite ease-in-out;
 }


 @-webkit-keyframes right {
   0%   { -webkit-transform: translate(-15px);   }
   50%  { -webkit-transform: translate(15px);    }
   100% { -webkit-transform: translate(-15px);   }
 }

 @-webkit-keyframes left {
   0%   { -webkit-transform: translate(15px);    }
   50%  { -webkit-transform: translate(-15px);   }
   100% { -webkit-transform: translate(15px);    }
 }

 @-moz-keyframes right {
   0%   { -moz-transform: translate(-15px);   }
   50%  { -moz-transform: translate(15px);    }
   100% { -moz-transform: translate(-15px);   }
 }

 @-moz-keyframes left {
   0%   { -moz-transform: translate(15px);    }
   50%  { -moz-transform: translate(-15px);   }
   100% { -moz-transform: translate(15px);    }
 }

 @keyframes right {
   0%   { transform: translate(-15px);  }
   50%  { transform: translate(15px);   }
   100% { transform: translate(-15px);  }
 }

 @keyframes left {
   0%   { transform: translate(15px);   }
   50%  { transform: translate(-15px);  }
   100% { transform: translate(15px);   }
 }


</style>
