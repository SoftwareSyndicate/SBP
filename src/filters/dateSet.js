import Vue from 'vue'

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var dateFormat = {
  day: "numeric",
  month: "numeric",
  year: "2-digit"
}

Vue.filter('dateSet', function(lastSet){
  var now = new Date();
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  //Today
  if(lastSet.toDateString() === now.toDateString()){
    return "Today"
  }

  if(lastSet > oneWeekAgo){
    return days[lastSet.getDay()];
  } else {
    return lastSet.toLocaleDateString("en-US", dateFormat);
  }
})
