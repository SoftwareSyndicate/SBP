import ParseService from '../services/ParseService.js'

class UserModel {
  constructor(){
    this.currentUser = null;
    this.loadUser()
  }

  //A bit easier than parsing objects into/outta localStorage?
  loadUser(){
    this.currentUser = Parse.User.current();
  }

  signIn(email, password){
    return ParseService.login(email, password).then(results => {
      this.currentUser = results;
      return results;
    }, error => {
      return Promise.reject(error);
    });
  }

  signOut(){
    Parse.User.logOut();
    this.currentUser = null;
  }

  signUp(email, password){
    return ParseService.signUp(email, password).then(results => {
      this.currentUser = results;
      return results;
    });
  }
}

export default new UserModel()

