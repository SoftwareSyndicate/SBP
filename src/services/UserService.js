import ParseService from '../services/ParseService.js'

class UserModel {
  constructor(){

  }

  login(email, password){
    return ParseService.login(email, password).then(results => {
      console.log(results);
      this.currentUser = results;
      return results;
    });
  }
}

export default new UserModel()

