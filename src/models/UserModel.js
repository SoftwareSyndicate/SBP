import ParseService from '../services/ParseService.js'
import notifications from '../services/NotificationService.js'

class UserModel {
  constructor(){

    this.loadUser()
  }

  //A bit easier than parsing objects into/outta localStorage?
  loadUser(){
    this.currentUser = Parse.User.current();
  }

  login(email, password){
    return ParseService.login(email, password).then(results => {
      this.currentUser = results;
      notifications.notify("User.login");
      return results;
    });
  }

  logout(){
    Parse.User.logOut();
    notifications.notify("User.logout");
  }

  signUp(email, password){
    return ParseService.signUp(email, password).then(results => {
      this.currentUser = results;
      notifications.notify("User.login");
      return results;
    });
  }
}

export default new UserModel()

