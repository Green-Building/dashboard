const express = require('express');
const bodyParser = require("body-parser");
const logger = require('morgan');
const Promise = require('bluebird');
const _ = require('lodash');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.set('port', (process.env.PORT || 4001));

app.get("/buildings", (req, res) => {
  console.log("herereree>>>>");
  res.json({a:1});
})


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});