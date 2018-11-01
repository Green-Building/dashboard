const express = require('express');
const bodyParser = require("body-parser");
const logger = require('morgan');
const Promise = require('bluebird');
const _ = require('lodash');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.set('port', (process.env.PORT || 4001));

app.get("/buildings", (req, res) => {
  console.log("herereree>>>>");
  console.log(req.body);
  const buildings = [
    {
      position: {lat: 37.3351874, lng: -121.88107150000002}
    },
    {
      position: {lat: 37.34964180000001, lng: -121.9389875}
    },
    {
      position: {lat: 37.4274745, lng: -122.16971899999999}
    }
  ]
  res.json({buildings});
})


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});