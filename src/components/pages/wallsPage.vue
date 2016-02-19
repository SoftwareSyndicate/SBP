<template>
  <div class="walls-page">
    <wall-list></wall-list>
  </div>
</template>

<script>
 import WallList from '../wallList/wallList.vue'
 export default {
   name: 'WallsPage',

   components: {
     WallList
   },
 };
</script>

<style>

</style>
