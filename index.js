const express = require('express');
const passport = require('passport');
const bodyParser = require("body-parser");
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const db = require('./models');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
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
//app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth-routes');
const apiLocalRoutes = require('./routes/api-routes');
const apiIntegrationRoutes = require('./routes/api-routes-integration');

app.get('/heartbeat', (req, res) => {
  res.status(201).json({status: 'alive'});
})
app.use('/auth', authRoutes);
app.use('/api/v0', apiLocalRoutes);
app.use('/api/v1', apiIntegrationRoutes);
app.get('/', (req, res) => {
  res.status(201).json({status: 'alive'});
})
return Promise.all([
  mongoose.connect('mongodb://admin1:admin1@ds127644.mlab.com:27644/greenbuilding_data'),
  db.sequelize.sync(),
])
.then(() => {
  app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
  });
});
