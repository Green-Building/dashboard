const express = require('express');
const bodyParser = require("body-parser");
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.Promise = Promise;
const apiRouter = require('./routes/api-routes');

const db = require('./models');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(apiRouter);

app.set('port', (process.env.PORT || 4001));

mongoose.connect('mongodb://localhost/greenBuilding');
db.sequelize.sync().then(() => {
  app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
  });
});
