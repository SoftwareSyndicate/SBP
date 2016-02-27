import ParseService from '../services/ParseService.js';
class RouteModel {
  constructor(){

  }

  getRoutes(){
    return ParseService.getRoutes().then(function(results){
      this.routes = results;
      return results;
    }.bind(this));
  }

  getRouteById(id){
    return ParseService.getRouteById(id).then(function(results){
      this.route = results;
      return results;
    }.bind(this));
  }
}

export default new RouteModel();
