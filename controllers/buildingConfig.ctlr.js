const Promise = require('bluebird');
const _ = require('lodash');
const db = require('../models');
const SensorDataModel = require('../mongoModels/SensorData');

const getBuilding = (req, res) => {
  const building_id = req.params.building_id;
  const { fetch_clusters } = req.query;
  console.log("req.query is>>>", req.query);
  let queryObj = {
    where: {
      id: building_id
    },
  };
  if(fetch_clusters) {
    queryObj.include = [ db.cluster ]
  }
  return db.building.findOne(queryObj)
  .then(building => {
    res.json(building);
  })
  .catch(err => {
    console.log("err fetching building>>>", err);
  })
};

const addBuilding = (req, res) => {
  const {
    address,
    latitude,
    longitude
  } = req.body.data;

  return db.building.create({
    address,
    latitude,
    longitude
  })
  .then(response => {
    console.log(response);
    res.json(response);
  })
  .catch(err => {
    console.log("error inserting building>>>", err);
  })

};

const searchBuildingByLatLng = (req, res) => {
  console.log("herereree>>>>");
  console.log(req.body);
  const { latitude, longitude } = req.body.data;
  //https://stackoverflow.com/questions/2234204/latitude-longitude-find-nearest-latitude-longitude-complex-sql-or-complex-calc
  /*
  return SensorDataModel.find({}).exec()
  .then(docs => {
    console.log("docs is >>>", docs);
    return db.sequelize.query("SELECT building.*, SQRT(POW(69.1 * (latitude - :startlat), 2) + POW(69.1 * (:startlng - longitude) * COS(latitude / 57.3), 2)) AS distance FROM building HAVING distance < 5 ORDER BY distance;",
      { replacements: { startlat: latitude, startlng:  longitude }, type: db.sequelize.QueryTypes.SELECT }
    );
  })
  */
  return db.sequelize.query("SELECT building.*, SQRT(POW(69.1 * (latitude - :startlat), 2) + POW(69.1 * (:startlng - longitude) * COS(latitude / 57.3), 2)) AS distance FROM building HAVING distance < 5 ORDER BY distance;",
    { replacements: { startlat: latitude, startlng:  longitude }, type: db.sequelize.QueryTypes.SELECT }
  )
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
};

module.exports = {
  getBuilding,
  addBuilding,
  searchBuildingByLatLng,
}