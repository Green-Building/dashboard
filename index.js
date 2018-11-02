const express = require('express');
const bodyParser = require("body-parser");
const logger = require('morgan');
const Promise = require('bluebird');
const _ = require('lodash');
const cors = require('cors');

const db = require('./models');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 4001));

app.post("/buildings", (req, res) => {
  console.log("herereree>>>>");
  console.log(req.body);
  const { latitude, longitude } = req.body.data;
  //https://stackoverflow.com/questions/2234204/latitude-longitude-find-nearest-latitude-longitude-complex-sql-or-complex-calc
  return db.sequelize.query("SELECT longitude, latitude, SQRT(POW(69.1 * (latitude - :startlat), 2) + POW(69.1 * (:startlng - longitude) * COS(latitude / 57.3), 2)) AS distance FROM building HAVING distance < 5 ORDER BY distance;",
    { replacements: { startlat: latitude, startlng:  longitude }, type: db.sequelize.QueryTypes.SELECT }
  )
  .then(buildings => {
    console.log("building >>>", buildings);
    buildings = _.map(buildings, building => {
      return {
        position: {
          lat: building.latitude,
          lng: building.longitude,
        }
      }
    });
    console.log('buildings>>>', buildings);
    /*
    const buildings = [
      {
        position: {lat: 37.3351874, lng: -121.88107150000002}  //SJSU
      },
      {
        position: {lat: 37.34964180000001, lng: -121.9389875} // SCU
      },
      {
        position: {lat: 37.4274745, lng: -122.16971899999999} // Stanford
      }
    ]
    */
    res.json({buildings});
  });

})

db.sequelize.sync().then(() => {
  app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
  });
});
