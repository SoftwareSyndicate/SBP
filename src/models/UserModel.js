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

  signUp(firstName, lastName, email, password){
    return ParseService.signUp(email, password).then(results => {
      this.currentUser = results;
      return results;
    });
  }

  isValidCreds(email, password){
    var valid = true;
    if(email.length < 3){
      valid = false;
      Materialize.toast("Email Invalid", 3000);
    }
    if(password.length < 6){
      valid = false;
      Materialize.toast("Password must be longer than 5 characters", 3000);
    }
    return valid;
  }
}

export default new UserModel()

