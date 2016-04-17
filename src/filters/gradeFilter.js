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
    if(findColorIndex(a.color) > findColorIndex(b.color)){
      return 1;
    } else if(findColorIndex(a.color) < findColorIndex(b.color)){
      return -1;
    } else {
      return 0;
    }
  });

  arr.reverse();

  function findColorIndex(color) {
    var value;
    switch(color){
      case "#95a5a6":
        value = 0;
        break;
      case "#ffeb3b":
        value = 1;
        break;
      case "#4caf50":
        value = 2;
        break;
      case "#f44336":
        value = 3;
        break;
      case "#2196f3":
        value = 4;
        break;
      case "#ff9800":
        value = 5;
        break;
      case "#9c27b0":
        value = 6;
        break;
      case "#212121":
        value = 7;
        break;
    }
    return value;
  }

  //return arr.slice(0, Number(limit))
  return arr;
})
