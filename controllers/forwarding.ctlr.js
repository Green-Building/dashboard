
const request = require('request-promise');
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
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/buildings/${building_id}`, requestOptions)).pipe(res);
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
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/buildings/search/location`, { qs: queryObject})).pipe(res);
}

const searchBuildingByLatLng = (req, res) => {
  const { latitude, longitude, radius } = req.query;
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/buildings/search/geocode`, {
    qs: {
      latitude,
      longitude,
      radius: +radius || 5,
    }
  })).pipe(res);
}

const getBuildingStats = (req, res) => {
  const { building_id: buildingId } = req.params;
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/buildings/statistics/${buildingId}`)).pipe(res);
}

const getClusterFromFloor = (req, res) => {
  const floor_id = +req.params.floor_id;
  const { fetch_nested } = req.query;
  let requestOptions = {};
  if (fetch_nested) {
    requestOptions.qs = {
      fetch_nested: fetch_nested,
    }
  }
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/floors/${floor_id}`, requestOptions)).pipe(res);
}

const getFloorStats = (req, res) => {
  const { floor_id: floorId } = req.params;
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/floors/statistics/${floorId}`)).pipe(res);
}

getCluster = (req, res) => {
  const { cluster_id } = req.params;
  const { fetch_nested } = req.query;
  let requestOptions = {};
  if (fetch_nested) {
    requestOptions.qs = {
      fetch_nested: fetch_nested,
    }
  }
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/clusters/${cluster_id}`, requestOptions)).pipe(res);
}

upsertCluster = (req, res) => {

  clusterToUpsert = req.body;
  console.log("upserting>>>>", clusterToUpsert);
  const options = {
    json: clusterToUpsert
  }

  return request.post(`${INFRA_MANAGER_HOST}/clusters`, options)
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("error upserting cluster>>>", err);
  })
}

deleteCluster = (req, res) => {
  const { cluster_id } = req.params;
  req.pipe(request.delete(`${INFRA_MANAGER_HOST}/clusters/${cluster_id}`)).pipe(res);
}

getNode = (req, res) => {
  const { node_id } = req.params;
  const { fetch_nested } = req.query;
  let requestOptions = {};
  if (fetch_nested) {
    requestOptions.qs = {
      fetch_nested: fetch_nested,
    }
  }
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/nodes/${node_id}`, requestOptions)).pipe(res);
}

upsertNode = (req, res) => {
  let nodeToUpsert = req.body;
  console.log("upserting>>>>", nodeToUpsert);
  const options = {
    json: nodeToUpsert
  }

  return request.post(`${INFRA_MANAGER_HOST}/nodes`, options)
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("error upserting node>>>", err);
  })
}

deleteNode = (req, res) => {
  const { node_id } = req.params;
  req.pipe(request.delete(`${INFRA_MANAGER_HOST}/nodes/${node_id}`)).pipe(res);
}

getSensor = (req, res) => {
  const { sensor_id } = req.params;
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/sensor/${sensor_id}`)).pipe(res);
}

upsertSensor = (req, res) => {
  let sensorToUpsert = req.body;
  console.log("upserting>>>>", sensorToUpsert);
  const options = {
    json: sensorToUpsert
  };
  return request.post(`${INFRA_MANAGER_HOST}/sensors`, options)
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("error upserting sensor>>>", err);
  })
}

deleteSensor = (req, res) => {
  const { sensor_id } = req.params;
  req.pipe(request.delete(`${INFRA_MANAGER_HOST}/sensors/${sensor_id}`)).pipe(res);
}

module.exports = {
  getBuilding,
  searchBuildingByCity,
  searchBuildingByLatLng,
  getBuildingStats,
  getClusterFromFloor,
  getFloorStats,
  getCluster,
  upsertCluster,
  deleteCluster,
  getNode,
  upsertNode,
  deleteNode,
  getSensor,
  upsertSensor,
  deleteSensor,
};