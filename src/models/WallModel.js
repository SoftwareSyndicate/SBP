import ParseService from '../services/ParseService.js';
class WallModel {
  constructor(){

  }

  calculateAverageWallGrade(walls){
    if(walls.attributes.routes){
      var total = 0;
      walls.attributes.routes.forEach(route => {
        total += parseInt(route.attributes.grade);
      });
      return Math.round(total / walls.attributes.routes.length);
    } else {
      return 0;
    }
  }

  getLastSetDate(date){
    return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
  }

  getGradeImage(averageGrade){
    var gradeImage;
    switch(averageGrade){
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
        gradeImage = "black7";
        break;
      case 8:
        gradeImage = "black8";
        break;
      default:
        gradeImage = "black8";
    }
    return gradeImage;
  }

  getWalls(){
    return ParseService.getWalls().then(function(results){
      this.walls = results;
      return results;
    }.bind(this));
  }

  getWallById(id){
    return ParseService.getWallById(id).then(function(results){
      this.wall = results;
      this.wall.attributes.routes.forEach(route => {
        route.attributes.gradeImage = this.getGradeImage(route);
      });
      return results;
    }.bind(this));
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
}

export default new WallModel();
