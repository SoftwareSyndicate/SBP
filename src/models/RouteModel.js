import ParseService from '../services/ParseService.js';
class RouteModel {
  constructor(){

  }

  getGradeImage(route){
    var gradeImage;
    switch(parseInt(route.attributes.grade)){
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

  getRoutes(){
    return ParseService.getRoutes().then(function(results){
      results.forEach(route => {
        route.attributes.grade = parseInt(route.attributes.grade);
        route.attributes.gradeImage = this.getGradeImage(route);

        //TODO remove this dummy data
        route.attributes.rating = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
        //TODO remove this hack - some routes have a null wall in parse
        if(!route.attributes.wall){
          route.attributes.wall = {};
          route.attributes.wall.attributes = {};
        }
      });
      this.routes = results;
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
