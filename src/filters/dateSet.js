import Vue from 'vue'

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var dateFormat = {
  weekday: "long",
  day: "numeric",
  month: "long",
}

Vue.filter('dateSet', function(lastSet){
  if(lastSet){
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
  } else {
    return ""
  }
})
