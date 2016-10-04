const fs = require('fs');
const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');

const appRouter = require('./service/router.js');
const serviceAuth = require(path.resolve(__dirname, 'service/auth.js'));
const MongoStore = connectMongo(expressSession);
const app = express();


const fsConfig = fs.readFileSync(path.resolve(__dirname, 'config.json'), 'utf8');
const config = JSON.parse(fsConfig);

let dbUrl = 'mongodb://';
if (config.dataBase.username) {
  dbUrl += config.dataBase.username + ':' + config.dataBase.password + '@';
}
dbUrl += config.dataBase.host + ':' + config.dataBase.port;
dbUrl += '/' + config.dataBase.db;

mongoose.connect(dbUrl);


app.use(expressSession({
  secret: config.SECRET,
  maxAge: new Date(Date.now() + 3600000),
  store: new MongoStore({url: dbUrl})
}), appRouter);

app.use(express.static(path.resolve(__dirname, config.staticDir)));

app.use((req, res, next) => {
  res.status(404).send('Not page');
});

app.use((err, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('open', () => {
  console.log('db is open');
  app.listen(config.PORT, () => {
    console.log('App listening port:', config.PORT);
  });
});
