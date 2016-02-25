class ParseService {
  constructor(){
    Parse.initialize("NKnM9iqa0hnqZhA1M2TdyDYMMMVpW24QNcqaSZ2Y", "k7cekvXmYutKXkuSuOp2scFgbkRnAUdQMh4SewsG");

    this.Gym = Parse.Object.extend("Gym");
    this.Wall = Parse.Object.extend("Wall");
    this.Route = Parse.Object.extend("Route");
    this.Hold = Parse.Object.extend("Hold");
  }

  deParse(results){
    var deParsedResults = [];
    results.forEach(result => {
      deParsedResults.push(result.attributes);
      if(result.attributes.routes){
        var deParsedRoutes = []
        result.attributes.routes.forEach(route => {
          deParsedRoutes.push(route.attributes);
        });
        result.attributes.routes = deParsedRoutes;
      }
      result.attributes.id = result.id;
      deParsedResults.push(result.attributes);
    });

    return deParsedResults;
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
    return query.find().then(results => {
      return this.deParse(results);
    });
  }





}

export default new ParseService();
