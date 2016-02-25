import ParseService from '../services/ParseService.js';
class WallModel {
  constructor(){

  }

  calculateAverageWallGrade(walls){
    if(walls.routes){
      var total = 0;
      walls.routes.forEach(route => {
        total += parseInt(route.grade);
      });
      return Math.round(total / walls.routes.length);
    } else {
      return 0;
    }
  }

  getWalls(){
    return ParseService.getWalls().then(function(results){
      console.log(results);
      this.walls = results;
      return results;
    }.bind(this));
  }
}

export default new WallModel();
