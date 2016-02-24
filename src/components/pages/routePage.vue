<template>
  <div class="route-page">
    <div class="route-image-container">
      <img :src="'/static/images/grades/' + route.grade + '.png'" alt="" class="grade">
    </div>

  </div>
</template>

<script>
 export default {
   name: 'Route Page',
   data(){
     return {
       route: {
         grade: "orange5",
         set: new Date(),
         sends: 53,
         rating: 3,
         id: 536165
       }
     }
   },

   components: {

   },
 };
</script>

<style>
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
