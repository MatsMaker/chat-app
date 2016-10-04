const mongoose = require('mongoose');
const UserSchema = require('../schema/User.js');

const schema = new mongoose.Schema(UserSchema);
const usersModel = mongoose.model('users', schema);

module.exports = usersModel;
