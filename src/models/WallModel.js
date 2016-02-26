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
}

export default new WallModel();
