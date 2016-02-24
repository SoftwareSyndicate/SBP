<template>
  <div class="gym-page">
    <div class="stamp-container">
      <img src="/static/images/sbpStamp.png" class="sbpStamp">
    </div>

    <h4 class="routes-sent">
      Routes sent this Month:
    </h4>

    <h3 class="routes-sent">
      {{routesSent}}
    </h3>

  </div>
</template>

<script>
 export default {
   name: 'GymPage',
   data(){
     return {
       routesSent: 546
     }
   },

   created(){
     setInterval(function(){
       this.routesSent++;
     }.bind(this), 1000);
   },
   components: {

   },
 };
</script>

<style lang="sass">
 .gym-page {

   .stamp-container {
     display: flex;
     margin-top: 2em;
     margin-bottom: 4em;

     img.sbpStamp {
       margin: auto;
       width: 15em;
       height: 16.5em;
     }
   }

   .routes-sent {
     font-weight: lighter;
     text-align: center;
   }
 }

</style>
