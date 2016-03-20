import Vue from 'vue'

Vue.filter('limitTo', function(arr, limit){
  return arr.slice(0, Number(limit))
})
