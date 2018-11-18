const _ = require('lodash');
const { SensorData2 } = require('../mongoModels/SensorData');

const insertSensorData = (req, res) => {
  const sensorData = req.body.data;

  console.log("sensorData is >>>", sensorData);
  sensorData.timeStamp = new Date(sensorData.timeStamp);
  return SensorData2.create(sensorData)
  .then(response => {
    console.log("insert sensor data successful>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error inserting sensor data >>>", err);
  });
};

const bulkInsertSensorData = (req, res) => {
  const sensorData = req.body.data;
  _.forEach(sensorData, datum => {
    datum.timeStamp = new Date(datum.timeStamp)
  });
  console.log("sensorData is >>>", sensorData);

  return SensorData2.collection.insert(sensorData)
  .then(response => {
    console.log("bulk insert sensor data successful>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error bulk inserting sensor data >>>", err);
  });
};

const searchSensorData = (req, res) => {
  let { startTime, endTime } = req.query;
  let { sensor_id: sensorID } = req.params;
  console.log("startTime>>>", startTime, endTime, sensorID);
  sensorID = String(sensorID);
  let query = {
    sensorID,
    timeStamp: {
      $gte: new Date(startTime),
      $lte: new Date(endTime),
    }
  };

  console.log("query is>>>", query);
  return SensorData2.find(query).exec()
  .then(sensorData => {
    console.log("getting sensor data is>>>", sensorData);
    res.json(sensorData);
  })
  .catch(err => {
    console.log("err getting sensor data is>>>", err);
  });
}

const searchSensorDataByCluster = (req, res) => {
  let { startTime, endTime } = req.query;
  let { cluster_id: clusterID } = req.params;
  clusterID = String(clusterID);
  let query = {
    clusterID,
    timeStamp: {
      $gte: new Date(startTime),
      $lte: new Date(endTime),
    }
  };

  console.log("query is>>>", query);
  return SensorData2.find(query).exec()
  .then(sensorData => {
    console.log("getting sensor data is>>>", sensorData);
    res.json(sensorData);
  })
  .catch(err => {
    console.log("err getting sensor data is>>>", err);
  });
}

const searchSensorDataByNode = (req, res) => {
  let { startTime, endTime } = req.query;
  let { node_id: nodeID } = req.params;
  nodeID = String(nodeID);
  let query = {
    nodeID,
    timeStamp: {
      $gte: new Date(startTime),
      $lte: new Date(endTime),
    }
  };

  console.log("query is>>>", query);
  return SensorData2.find(query).exec()
  .then(sensorData => {
    console.log("getting sensor data is>>>", sensorData);
    res.json(sensorData);
  })
  .catch(err => {
    console.log("err getting sensor data is>>>", err);
  });
}

module.exports = {
  insertSensorData,
  bulkInsertSensorData,
  searchSensorData,
  searchSensorDataByCluster,
  searchSensorDataByNode,
}