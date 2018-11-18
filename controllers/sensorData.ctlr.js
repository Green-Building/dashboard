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
  let { id, idType, startTime, endTime } = req.query;
  console.log("startTime>>>", startTime, endTime);
  id = String(id);
  let query = {
    timeStamp: {
      $gte: new Date(startTime),
      $lte: new Date(endTime),
    }
  };
  if(idType === 'cluster') {
    query.clusterID = id;
  } else if (idType === 'node'){
    query.nodeID = id;
  } else {
    query.sensorID = id;
  }
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
}