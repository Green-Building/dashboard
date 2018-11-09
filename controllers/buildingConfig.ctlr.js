const Promise = require('bluebird');
const _ = require('lodash');
const db = require('../models');
const SensorDataModel = require('../mongoModels/SensorData');

function parseNesting(nestedStr, starting) {
  const children = fetch_nested.split(',');
  const nesting = {
    floor: null,
    cluster: null,
    room: 'floor',
    node: 'cluster',
    sensor: 'node',
  }
  _.forEach(children, child => {
    if(child === 'floor') {
      map.floor = {
        model: db.floor,
      }
    }
  })
}

const getBuilding = (req, res) => {
  const building_id = req.params.building_id;
  const { fetch_nested } = req.query;
  let queryObj = {
    where: {
      id: building_id
    },
  };
  if(fetch_nested) {
    queryObj.include = [{
      model: db.cluster,
    },{
      model: db.floor,
    }];
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
  console.log(req.query);
  const { latitude, longitude } = req.query;
  //https://stackoverflow.com/questions/2234204/latitude-longitude-find-nearest-latitude-longitude-complex-sql-or-complex-calc
  return db.sequelize.query("SELECT building.*, SQRT(POW(69.1 * (latitude - :startlat), 2) + POW(69.1 * (:startlng - longitude) * COS(latitude / 57.3), 2)) AS distance FROM building HAVING distance < 5 ORDER BY distance;",
    { replacements: { startlat: latitude, startlng:  longitude }, type: db.sequelize.QueryTypes.SELECT }
  )
  .then(buildings => {
    console.log('buildings>>>', buildings);
    res.json(buildings);
  });
};

const searchBuildingByCity = (req, res) => {
  const { city, state, zipcode } = req.query;
  console.log("city is>>", city);
  const query  = { };
  if(zipcode) {
    query.zipcode = zipcode;
  } else {
    if (city) {
      query.city = city;
    }
    if(state) {
      query.state = state;
    }
  }
  return db.building.findAll({where: query})
  .then(buildings => {
    console.log('buildings>>>', buildings);
    res.json(buildings);
  })
  .catch(err => {
    console.log("err searching building by city/state/zipcode>>>", err);
  })
}

module.exports = {
  getBuilding,
  addBuilding,
  searchBuildingByLatLng,
  searchBuildingByCity,
}