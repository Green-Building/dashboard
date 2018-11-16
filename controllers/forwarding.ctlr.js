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

module.exports = {
  getBuilding,
}