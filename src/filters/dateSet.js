import Vue from 'vue'

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
    return lastSet.toDateString().split(" ")[0];
  } else {
    return lastSet.toLocaleDateString("en-US", dateFormat);
  }

  return "fuck"
})
