<template>
  <div class="wall-list">
    <ul class="collection">
      <li class="collection-item avatar">
        <img src="/static/images/grades/orange5.png" alt="" class="circle">
        <span class="title">Title</span>
        <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
      </li>
      <li class="collection-item avatar">
        <i class="material-icons circle">folder</i>
        <span class="title">Title</span>
        <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
      </li>
      <li class="collection-item avatar">
        <i class="material-icons circle green">insert_chart</i>
        <span class="title">Title</span>
        <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
      </li>
      <li class="collection-item avatar">
        <i class="material-icons circle red">play_arrow</i>
        <span class="title">Title</span>
        <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
      </li>
    </ul>
  </div>
</template>

<script>
 export default {
   name: 'WallList',
   data(){
     return {
       childComments: [],
       open: true
     }
   },
   created(){

   },
   methods: {
     openLoginModal: function (event) {
       $('#loginModal').openModal();
     }
   }
 }
</script>

<style style="saas">
 .wall-list {
   
 }
</style>
