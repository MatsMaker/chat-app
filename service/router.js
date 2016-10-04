const express = require('express');

const router = express();
const UserModel = require('./model/User.js');


router.get('/signup/:newUser', (req, res) => {
  const userName = req.params.newUser;
  const newUser = new UserModel({name: userName});
  newUser.add().then(result => {
    res.send(userName + ' is added');
  }).catch((err) => {
    if (err.code == 11000) {
      res.send(userName + ' already exists')
    }
    res.send(userName + ' isn\'t added' + err);
  });
});

router.get('/login/:userName', (req, res) => {
  const userName = req.params.userName;
  UserModel.auth(userName).then(user => {
    if (user) {
      req.session.user = user;
      res.send('Admin Homepage: ' + user._id);
    } else {
      res.send(userName + ' isn\'t already');
    }
  }).catch(err => {
    res.send(err);
  });
});

router.get('/logout', (req, res) => {
  req.session.cookie.expires = new Date();
  delete req.session.user;
  res.send('logout');
});

router.get('/index', (req, res) => {
  if (req.session.user) {
    res.send('Index: ' + req.session.user.name);
  } else {
    res.send('need login');
  }
});

module.exports = router;
