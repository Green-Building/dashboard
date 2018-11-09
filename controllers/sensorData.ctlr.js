const _ = require('lodash');
const SensorDataModel = require('../mongoModels/SensorData');

const insertSensorData = (req, res) => {
  const sensorData = req.body.data;

  console.log("sensorData is >>>", sensorData);
  sensorData.timeStamp = new Date(sensorData.timeStamp);
  return SensorDataModel.create(sensorData)
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

  return SensorDataModel.collection.insert(sensorData)
  .then(response => {
    console.log("bulk insert sensor data successful>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error bulk inserting sensor data >>>", err);
  });
};

const searchSensorData = (req, res) => {
  const { idType, id, startTime, endTime } = req.query;
  console.log("startTime>>>", startTime, endTime);
  console.log("id is>>>", id, startTime, endTime);
  return SensorDataModel.find({
    sensorID: String(id),
    timeStamp: {
      $gte: new Date(startTime),
      $lte: new Date(endTime),
    }
  }).exec()
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