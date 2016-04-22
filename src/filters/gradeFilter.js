import Vue from 'vue'

var colorsArray = ['Gray','Yellow','Green','Red','Blue','Orange','Purple','Black'];
var gradesArray = ['v0','v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12'];


Vue.filter('gradeFilter', function(arr, limit){
  arr.sort(function(a, b) {
    if(a.grade > b.grade){
      return 1;
    } else if(a.grade < b.grade) {
      return -1;
    } else {
      return 0;
    }
  });

  arr.sort(function(a, b){
    if(a.colorValue > b.colorValue){
      return 1;
    } else if(a.colorValue < b.colorValue){
      return -1;
    } else {
      return 0;
    }
  });

  arr.reverse();

  //return arr.slice(0, Number(limit))
  return arr;
})
