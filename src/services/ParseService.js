class ParseService {
  constructor(){
    Parse.initialize("NKnM9iqa0hnqZhA1M2TdyDYMMMVpW24QNcqaSZ2Y", "k7cekvXmYutKXkuSuOp2scFgbkRnAUdQMh4SewsG");

    this.Gym = Parse.Object.extend("Gym");
    this.Wall = Parse.Object.extend("Wall");
    this.Route = Parse.Object.extend("Route");
    this.SentRoute = Parse.Object.extend("SentRoute");
    this.Hold = Parse.Object.extend("Hold");
    this.gymId = "4WChpaHxDE"
    this.SBP = {
      __type: "Pointer",
      className: "Gym",
      objectId: this.gymId
    };
  }

  /** User **/
  login(email, password){
    return Parse.User.logIn(email, password);
  }

  signUp(email, password){
    return Parse.User.signUp(email, password);
  }

  /** Gym **/

  /** Walls **/
  getWalls(){
    var query = new Parse.Query(this.Wall);
    query.include("routes");
    query.equalTo("gym", this.SBP);
    return query.find();
  }

  getWallById(id){
    var query = new Parse.Query(this.Wall);
    query.include('routes');
    return query.get(id);
  }


  /** Routes **/
  getRoutes(){
    var query = new Parse.Query(this.Route);
    query.equalTo("gym", this.SBP);
    query.equalTo("takenDown", null);
    query.limit(1000);
    query.include("wall");
    return query.find();
  }

  getRoutesByWallId(wallId){
    var wall = {
      __type: "Pointer",
      className: "Wall",
      objectId: wallId
    };
    var query = new Parse.Query(this.Route);
    query.equalTo("gym", this.SBP);
    query.equalTo("wall", wall);
    query.limit(1000);
    query.include("wall");
    return query.find();
  }

  getRouteById(id){
    var query = new Parse.Query(this.Route);
    query.include("wall");
    return query.get(id);
  }

  updateSentRoutes(routes){
    console.log("ParseService.updateSentRoutes()");
    var data = {
      userId: Parse.User.current().id,
      routes: routes
    };

    return Parse.Cloud.run("sendRoutes", data).then(results => {
      console.log(results);
      return results;
    }, error => {
      console.log(error);
      return Promise.reject(error);
    });
  }

  getSentRoutes(userId){
    var query = new Parse.Query(this.SentRoute);
    query.equalTo("user", Parse.User.current());
    query.limit(1000);
    query.include("route");
    return query.find();
  }



}

export default new ParseService();
