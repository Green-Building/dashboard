const request = require('request');
const INFRA_MANAGER_HOST = 'http://localhost:8080';
const DATA_MANAGER_HOST = 'http://localhost:8080';
const SIMULATOR_HOST = 'http://localhost:8080';

const getBuilding = (req, res) => {
  const { building_id } = req.params;
  const { fetch_nested } = req.query;
  let requestOptions = {};
  if (fetch_nested) {
    requestOptions.qs = {
      fetch_nested: fetch_nested,
    }
  }
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/buildings/${building_id}`, requestOptions)).pipe(res)
}

const searchBuildingByCity = (req, res) => {
  const { city, state, zipcode } = req.query;
  const queryObject  = { };
  if(zipcode) {
    queryObject.zipcode = zipcode;
  } else {
    if (city) {
      queryObject.city = city;
    }
    if(state) {
      queryObject.state = state;
    }
  }
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/buildings/search/location`, { qs: requestOptions})).pipe(res);
}

const searchBuildingByLatLng = (req, res) => {
  const { latitude, longitude, radius } = req.query;
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/buildings/search/geocode`, {
    qs: {
      latitude,
      longitude,
      radius: radius || 5,
    }
  })).pipe(res);
}

const getBuildingStats = (req, res) => {
  const { building_id: buildingId } = req.params;
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/buildings/statistics/${buildingId}`)).pipe(res);
}

module.exports = {
  getBuilding,
  searchBuildingByCity,
  searchBuildingByLatLng,
  getBuildingStats,
};