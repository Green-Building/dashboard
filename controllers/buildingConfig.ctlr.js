const Promise = require('bluebird');
const _ = require('lodash');
const db = require('../models');
const SensorDataModel = require('../mongoModels/SensorData');
const { generateNest } = require('../utils');

const getBuilding = (req, res) => {
  const building_id = req.params.building_id;
  const { fetch_nested } = req.query;
  let queryObj = {
    where: {
      id: building_id
    },
  };
  if(fetch_nested) {
    queryObj.include = generateNest('building', fetch_nested, db);
    console.log("nesting is>>>", queryObj.include);
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
  const { latitude, longitude, radius } = req.query;
  //https://stackoverflow.com/questions/2234204/latitude-longitude-find-nearest-latitude-longitude-complex-sql-or-complex-calc
  return db.sequelize.query("SELECT building.*, SQRT(POW(69.1 * (latitude - :targetLat), 2) + POW(69.1 * (:targetLng - longitude) * COS(latitude / 57.3), 2)) AS distance FROM building HAVING distance < :targetRadius ORDER BY distance;",
    { replacements: { targetLat: +latitude, targetLng:  +longitude, targetRadius: +radius || 5 }, type: db.sequelize.QueryTypes.SELECT }
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