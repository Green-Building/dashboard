const express = require('express');
const passport = require('passport');
const bodyParser = require("body-parser");
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.Promise = Promise;

const db = require('./models');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 4001));
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./middleware/local-signup');
const localLoginStrategy = require('./middleware/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth-routes');
const apiRoutes = require('./routes/api-routes');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

mongoose.connect('mongodb://localhost/greenBuilding');
db.sequelize.sync().then(() => {
  app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
  });
});
