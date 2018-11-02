const express = require('express');
const bodyParser = require("body-parser");
const logger = require('morgan');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');
const cors = require('cors');
mongoose.Promise = Promise;
const SensorData = require('./mongoModels/SensorData');

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
  /*
  return Promise.resolve(SensorData.create({
    sensorID: '123',
    unit: 'c',
    data: 112.2,
    date: new Date(),
    timeStamp: new Date(),
    clusterID: '1',
    roomID: '202',
    floor: '3',
    buildingID: '1',
    zipcode: '10001',
  }))
  */
 return Promise.resolve(SensorData.find({}))
  .then(docs => {
    console.log("docs is >>>", docs);
    return db.sequelize.query("SELECT building.*, SQRT(POW(69.1 * (latitude - :startlat), 2) + POW(69.1 * (:startlng - longitude) * COS(latitude / 57.3), 2)) AS distance FROM building HAVING distance < 5 ORDER BY distance;",
      { replacements: { startlat: latitude, startlng:  longitude }, type: db.sequelize.QueryTypes.SELECT }
    );
  })
  .then(buildings => {
    console.log("building >>>", buildings);
    buildings = _.map(buildings, building => {
      return {
        building: building,
        position: {
          lat: building.latitude,
          lng: building.longitude,
        }
      }
    });
    console.log('buildings>>>', buildings);
    res.json({buildings});
  });

});

app.get('/buildings/:building_id', (req, res) => {
  const building_id = req.params.building_id;
  return db.building.findOne({
    where: {
      id: building_id
    },
  })
  .then(building => {
    res.json(building);
  })
  .catch(err => {
    console.log("err fetching building>>>", err);
  })
});

app.get('/clusters/:cluster_id', (req, res) => {
  const cluster_id= req.params.cluster_id;
  return db.cluster.findOne({
    where: {
      id: cluster_id
    },
    include: [ {model: db.building, as: 'building'} ]
  })
  .then(cluster => {
    res.json(cluster);
  })
  .catch(err => {
    console.log("err fetching building>>>", err);
  })
})

mongoose.connect('mongodb://localhost/greenBuilding');
db.sequelize.sync().then(() => {
  app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
  });
});
