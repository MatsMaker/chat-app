const _ = require('underscore');
const dbUserModel = require('../db/model/user.js');
const dbUserShema = require('../db/schema/User.js');

class User {

  constructor(data) {
    this.data = data;
  }

  add() {
    return new Promise((resolve, reject) => {
      const user = dbUserModel(this.data);
      user.save(err => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      })
    });
  }

  static findByName(name) {
    return dbUserModel.findOne({name: name});
  }

  static auth(name) {
    return dbUserModel.findOne({name: name});
  }

}

module.exports = User;
