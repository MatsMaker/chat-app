const UserSchema = {
  name: {
    type: String,
    unique: true
  }
};

module.exports = UserSchema;
