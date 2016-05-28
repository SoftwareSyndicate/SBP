import ParseService from '../services/ParseService.js';
import Notifications from '../services/NotificationService.js';
class RouteModel {
  constructor(){
    this.allRoutes = [];
    this.sentRoutes = [];
    this.sendingRoutes = false;
    if(!localStorage.getItem("routesToBeUpdated")){
      var empty = [];
      localStorage.setItem("routesToBeUpdated", JSON.stringify(empty));
    }
  }

  saveRoutes(){
    this.sendingRoutes = true;
    setTimeout(() => {
      var routesToBeUpdated = JSON.parse(localStorage.getItem("routesToBeUpdated"));
      if(routesToBeUpdated.length > 0){
        Notifications.notify('Overlay.setVisible', true);

        return ParseService.updateSentRoutes(routesToBeUpdated).then(results => {
          this.sentRoutes = results;
          var empty = [];
          localStorage.setItem("routesToBeUpdated", JSON.stringify(empty));
          Notifications.notify("RouteModel.sentRoutesUpdated");
          this.sendingRoutes = false;
        }, error => {
          return Promise.reject(error);
        });
      } else {
        this.sendingRoutes = false;
      }
    });
  }

  getSentRoutes(){
    if(Parse.User.current()){
      this.gettingRoutes = true;
      return ParseService.getSentRoutes(Parse.User.current().id).then(results => {
        this.gettingRoutes = false;
        console.log("got new sent routes");
        console.log(results);
        this.sentRoutes = results;
        Notifications.notify("RouteModel.sentRoutesUpdated");
        return results;
      }, error => {
        return Promise.reject(error);
      });
    }
  }

  findColorIndex(color){
    var value;
    switch(color){
      case "rgba(209,209,209, 0.8)":
        value = 0;
        break;
      case "rgba(255,210,28, 0.8)":
        value = 1;
        break;
      case "rgba(5,179,99, 0.9)":
        value = 2;
        break;
      case "rgba(243,23,38, 0.8)":
        value = 3;
        break;
      case "rgba(48,99,245, 0.8)":
        value = 4;
        break;
      case "rgba(252,109,33, 0.8)":
        value = 5;
        break;
      case "rgba(183,22,229,0.8)":
        value = 6;
        break;
      case "rgba(33,33,33,0.9)":
        value = 7;
        break;
    }
    return value;
  }

  getGradeImage(route){
    var gradeImage;
    switch(Math.round(parseInt(route.attributes.grade))){
      case 0:
        gradeImage = "gray0";
        break;
      case 1:
        gradeImage = "yellow1";
        break;
      case 2:
        gradeImage = "green2";
        break;
      case 3:
        gradeImage = "red3";
        break;
      case 4:
        gradeImage = "blue4";
        break;
      case 5:
        gradeImage = "orange5";
        break;
      case 6:
        gradeImage = "purple6";
        break;
      case 7:
        gradeImage = "purple7";
        break;
      case 8:
        gradeImage = "black8";
        break;
      case 9:
        gradeImage = "black9";
        break;
      case 10:
        gradeImage = "black10";
        break;
      case 11:
        gradeImage = "black11";
        break;
      default:
        gradeImage = "black11";
        break;
    }
    return gradeImage;
  }

  getAllRoutes(){
    return ParseService.getRoutes().then(function(results){
      results.forEach(route => {
        route.attributes.grade = parseInt(route.attributes.grade);
        route.attributes.gradeImage = this.getGradeImage(route);
        route.attributes.roundedGrade = Math.round(route.attributes.grade);

        //TODO remove this dummy data
        route.attributes.rating = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
        //TODO remove this hack - some routes have a null wall in parse
        if(!route.attributes.wall){
          route.attributes.wall = {};
          route.attributes.wall.attributes = {};
        }
      });
      this.allRoutes = results;
      return results;
    }.bind(this));
  }

  getRouteById(id){
    return ParseService.getRouteById(id).then(function(results){
      results.attributes.grade = parseInt(results.attributes.grade);
      results.attributes.gradeImage = this.getGradeImage(results);
      results.attributes.rating = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
      console.log(results.attributes.rating);
      this.route = results;
      return results;
    }.bind(this));
  }

  rateRoute(route){

  }

  sentRoute(route, user){
    
  }
}

export default new RouteModel();
