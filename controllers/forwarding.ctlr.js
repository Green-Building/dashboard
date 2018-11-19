const request = require('request-promise');
const INFRA_MANAGER_HOST = 'http://localhost:3006';
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

const getCluster = (req, res) => {
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

const addCluster = (req, res) => {

  let clusterToAdd = req.body;
  console.log("clusterToAdd>>>>", clusterToAdd);
  const options = {
    json: clusterToAdd
  }

  return request.post(`${INFRA_MANAGER_HOST}/clusters`, options)
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("error upserting cluster>>>", err);
  })
}

const updateCluster = (req, res) => {
  let cluster = req.body;
  const { cluster_id } = req.params;
  const options = {
    json: cluster
  }

  return request.put(`${INFRA_MANAGER_HOST}/clusters/${cluster_id}`, options)
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("error updating cluster>>>", err);
  })
}

const deleteCluster = (req, res) => {
  const { cluster_id } = req.params;
  req.pipe(request.delete(`${INFRA_MANAGER_HOST}/clusters/${cluster_id}`)).pipe(res);
}

const getNode = (req, res) => {
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

const addNode = (req, res) => {
  let newNode = req.body;
  console.log("newNode>>>>", newNode);
  const options = {
    json: newNode
  }

  return request.post(`${INFRA_MANAGER_HOST}/nodes`, options)
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("error upserting node>>>", err);
  })
}

const updateNode = (req, res) => {
  let node = req.body;
  const { node_id } = req.params;
  const options = {
    json: node
  }

  return request.put(`${INFRA_MANAGER_HOST}/nodes/${node_id}`, options)
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("error updating node>>>", err);
  })
}

const deleteNode = (req, res) => {
  const { node_id } = req.params;
  req.pipe(request.delete(`${INFRA_MANAGER_HOST}/nodes/${node_id}`)).pipe(res);
}

const getSensor = (req, res) => {
  const { sensor_id } = req.params;
  req.pipe(request.get(`${INFRA_MANAGER_HOST}/sensor/${sensor_id}`)).pipe(res);
}

const addSensor = (req, res) => {
  let newSensor = req.body;
  console.log("newSensor>>>>", newSensor);
  const options = {
    json: newSensor
  };
  return request.post(`${INFRA_MANAGER_HOST}/sensors`, options)
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("error upserting sensor>>>", err);
  })
}

const updateSensor = (req, res) => {
  let sensor = req.body;
  const { sensor_id } = req.params;
  const options = {
    json: node
  }

  return request.put(`${INFRA_MANAGER_HOST}/sensors/${sensor_id}`, options)
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("error updating sensor>>>", err);
  })
}

const deleteSensor = (req, res) => {
  const { sensor_id } = req.params;
  req.pipe(request.delete(`${INFRA_MANAGER_HOST}/sensors/${sensor_id}`)).pipe(res);
}

const bulkInsertSensorData = (req, res) => {
  let sensorData = req.body;
  const options = {
    json: sensorData
  };
  return request.post(`${DATA_MANAGER_HOST}/sensor_data`, options)
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("error bulk upserting sensor data>>>", err);
  })
}

const deleteSensorData = (req, res) => {
  const { id } = req.params;
  req.pipe(request.delete(`${DATA_MANAGER_HOST}/sensor_data/${id}`)).pipe(res);
}

const searchSensorData = (req, res) => {
  const { sensor_id } = req.params;
  req.pipe(request.get(`${DATA_MANAGER_HOST}/sensor_data/sensor/${sensor_id}`)).pipe(res);
}

const searchSensorDataByCluster = (req, res) => {
  const { cluster_id } = req.params;
  req.pipe(request.get(`${DATA_MANAGER_HOST}/sensor_data/cluster/${cluster_id}`)).pipe(res);
}


const searchSensorDataByNode = (req, res) => {
  const { node_id } = req.params;
  req.pipe(request.get(`${DATA_MANAGER_HOST}/sensor_data/node/${node_id}`)).pipe(res);
}

module.exports = {
  getBuilding,
  searchBuildingByCity,
  searchBuildingByLatLng,
  getBuildingStats,
  getClusterFromFloor,
  getFloorStats,
  getCluster,
  addCluster,
  updateCluster,
  deleteCluster,
  getNode,
  addNode,
  updateNode,
  deleteNode,
  getSensor,
  addSensor,
  updateSensor,
  deleteSensor,
  bulkInsertSensorData,
  deleteSensorData,
  searchSensorData,
  searchSensorDataByCluster,
  searchSensorDataByNode,
};