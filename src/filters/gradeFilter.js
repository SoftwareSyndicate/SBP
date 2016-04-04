import Vue from 'vue'

var colorsArray = ['Gray','Yellow','Green','Red','Blue','Orange','Purple','Black'];
var gradesArray = ['v0','v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12'];


Vue.filter('gradeFilter', function(arr, limit){
  console.log(arr);
  //return arr.slice(0, Number(limit))
  return arr;
})
