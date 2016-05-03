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
    var user = new Parse.User();
    user.set("firstName", firstName);
    user.set("lastName", lastName);
    user.set("username", email);
    user.set("password", password);
    user.set("email", email);

    return user.signUp(null, {
      success: function(user) {
        console.log(user);
        this.currentUser = user;
        return user;
      }.bind(this),
      error: function(user, error) {
        return error;
      }.bind(this)
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

