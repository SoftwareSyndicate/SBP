class ParseService {
  constructor(){
    Parse.initialize("NKnM9iqa0hnqZhA1M2TdyDYMMMVpW24QNcqaSZ2Y", "k7cekvXmYutKXkuSuOp2scFgbkRnAUdQMh4SewsG");

    this.Gym = Parse.Object.extend("Gym");
    this.Wall = Parse.Object.extend("Wall");
    this.Route = Parse.Object.extend("Route");
    this.Hold = Parse.Object.extend("Hold");
    this.gymId = "4WChpaHxDE"
    this.SBP = {
      __type: "Pointer",
      className: "Gym",
      objectId: this.gymId
    };
  }

  /** User **/
  login(username, password){
    return Parse.User.logIn(username, password, {
      success: function(user) {
        return user;
      },
      error: function(user, error) {
        return error;
      }
    });
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
    return query.get(id);
  }





}

export default new ParseService();
